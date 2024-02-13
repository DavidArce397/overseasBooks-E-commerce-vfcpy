const path = require('path');
/* const books = require('../database/libros');   */

let fs = require('fs');
/* let booksJSON = fs.readFileSync(path.join(__dirname,'../data/libros.json')); */


let db = require('../database/models');
const Op = db.Sequelize.Op;


let mainControllers = {
    listAuthors: (req, res) => {
        db.Author.findAll(
            {
                order: [
                    ['id', "DESC"]
                ],
                // limit : 100
            }
        )
            .then(function (autores) {
                res.render(path.join(__dirname, '../views/vistaPruebaAutores'), { autores: autores });
            })
    },

    listBooks : (req, res) => {
        db.Book.findAll(
            {
                include: [
                    {association: "categories"},
                    {association: "authors"}
                    ],

                order: [
                    ['id', "DESC"]
                ],
                // limit : 100
            }
        )
            .then(function (books) {
                res.render(path.join(__dirname, '../views/vistaPruebaAutores'), { books });
                
                
            })
          
    },

    listCategories : (req, res) => {
        db.Category.findAll(
            {
                order: [
                    ['id', "DESC"]
                ]
                // limit : 100
            }
        )
            .then(function (categories) {
                res.render(path.join(__dirname, '../views/vistaPruebaAutores'), { categories });
            })
        },

        listUsers : (req, res) => {
            db.User.findAll(
                {
                    order: [
                        ['id', "DESC"]
                    ]
                    // limit : 100
                }
            )
                .then(function (users) {
                    res.render(path.join(__dirname, '../views/vistaPruebaAutores'), { users });
                })
            }

            
        
    
};


const main = (req, res) => {
    
    let booksJSON = fs.readFileSync(path.join(__dirname,'../data/libros.json'));
    let books =  db.Book.findAll(
        {
            include: [
                {association: "categories"},
                {association: "authors"}
                ],

            order: [
                ['id', "DESC"]
            ],
            // limit : 100
        }
    )
        .then((books) => {
            const allBooks = books.map(book => {
                return {
                    id : book.id,
                    titleEsp : book.title,
                    color : book.color,
                    img : book.img,
                    description : book.description,
                    price : book.price,
                    author : book.authors.name,
                    category : book.categories.category
                }
            })
            res.render(path.join(__dirname,'../views/home.ejs'), {
                'allBooks': allBooks, 
                categories: ["Best Sellers", "Science", "Fiction"]
            });
        })
    
};


module.exports = {main, mainControllers};

    