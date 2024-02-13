const path = require('path');
const { validationResult } = require('express-validator');
const { mainControllers } = require('./mainControllers');


let db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {
    checkout: async function (req, res) {
        let userLoggedId = req.session.userLogged.id;
        // return res.send({...req.body, userId : userLoggedId})
        let order = await db.Order.create({
            ...req.body, userId: userLoggedId
        },
            {
                include: [
                    { association: "orderItems" }
                ],
            }
        );
        res.json({ok : true , status : 200, order : order});
    },
    
    order : async function (req, res) {
        let order = await db.Order.findByPk(req.params.id, {
            include: [
                { association: "orderItems" }
            ]
        });

        return res.render(path.join(__dirname, '../views/order') , {order});
    }


};













// DESARROLLO API PRODUCTS
// API ENDPOINTS

let apiEndpoints = {
    // Listado de productos
    listProductsAPI: (req, res) => {
        db.Book.findAll({
            include: [
                { association: "categories" },
                { association: "authors" }
            ],
            order: [['createdAt', 'DESC']] // Orden descendente por createdAt

        })
            .then(books => {
                // Contar las categorías
                let categoriesCount = {};
                books.forEach(book => {
                    const categoryName = book.categories.category;
                    if (!categoriesCount[categoryName]) {
                        categoriesCount[categoryName] = 1;
                    } else {
                        categoriesCount[categoryName]++;
                    }
                });

                // Obtener el total de categorías
                const totalCategories = Object.keys(categoriesCount).length;

                return res.status(200).json({
                    count: books.length,
                    countByCategory: categoriesCount,
                    totalCategories: totalCategories,
                    data: books,
                    status: 200
                });
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({
                    error: "Internal Server Error",
                    status: 500
                });
            });
    }

    ,

    // Product detail
    listProductDetailAPI: (req, res) => {
        db.Book.findByPk(req.params.id)
            .then(book => {
                return res.status(200).json({
                    data: book,
                    status: 200
                })
            })
    },

    // Product Search

    productSearchAPI: (req, res) => {
        const { search } = req.query;
        // console.log(search, 'soy query');

        db.Book.findAll({
            include: [
                { association: "categories" },
                { association: "authors" }
            ],
            where: {
                title: { [Op.like]: `%${search}%` }
            }
        }).then(function (books) {
            if (books.length == 0) {
                return res.status(404).json({ message: "No se encontraron libros con ese título" });
            }

            return res.status(200).json(books);

        })
            .catch(error => {
                console.error("Error en la búsqueda de productos:", error);
                return res.status(500).json({ message: "Error en el servidor" });
            });
    }








};



