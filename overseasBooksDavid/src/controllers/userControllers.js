const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
let db = require('../database/models');
const Op = db.Sequelize.Op;


const login = (req, res) => {
    res.render(path.join(__dirname, '../views/login.ejs'));
}

const register = (req, res) => {
    res.render(path.join(__dirname, '../views/register.ejs'));
}

const passwordreset = (req, res) => {
    res.render(path.join(__dirname, '../views/passwordreset.ejs'));
}

//agregocomentario
// const processRegister = (req, res) => {
//     const resultValidation = validationResult(req);
//     if (resultValidation.errors.length > 0) {
//         if (req.file) {
//             fs.unlinkSync(path.join(__dirname, '../../public/images/avatars', req.file.filename))
//         }
//         return res.render(path.join(__dirname, '../views/register.ejs'), {
//             errors: resultValidation.mapped(),
//             oldData: req.body
//         });
//     }

    // let userinDB = User.findByField('email', req.body.email);

    // if (userinDB) {
    //     return res.render(path.join(__dirname, '../views/register.ejs'), {
    //         errors: { email: { msg: 'Este email ya esta registrado' } },
    //         oldData: req.body
    //     });
    // }

    // let userToCreate = {
    //     ...req.body,
    //     password: bcryptjs.hashSync(req.body.password, 10),
    //     avatar: req.file.filename
    // }
    // let userCreated = User.create(userToCreate);

    // return res.redirect('/user/login')
// }
// const processLogin = (req, res) => {
//     const resultValidation = validationResult(req);
//     if (resultValidation.errors.length > 0) {
//         // console.log(resultValidation.errors)
//         return res.render(path.join(__dirname, '../views/login.ejs'), {
//             errors: resultValidation.mapped(),
//             oldData: req.body
//         });
//     }

//     let userToLogin = db.User.findOne({ where: { email: req.body.email }});
//     // console.log(userToLogin)

//     /* return res.send(userToLogin); */


//     if (userToLogin) {
//         let comparePassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
//         if (comparePassword) {
//             req.session.userLogged = userToLogin

//             if (req.body.botonremember) {
//                 res.cookie('userEmail', req.body.email, { maxAge: (1000000 * 90) * 4 })
//             }

//             return res.redirect('/user/profile')
//         }
//         return res.render(path.join(__dirname, '../views/login.ejs'), {
//             errors: { password: { msg: 'La contraseña ingresada no es correcta' } },
//             oldData: req.body
//         });
//     } else {
//         res.render(path.join(__dirname, '../views/login.ejs'), {
//             errors: { email: { msg: 'El email ingresado no esta registrado' } },
//             oldData: req.body
//         });
//     }
// }

const processLogin = async (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render(path.join(__dirname, '../views/login.ejs'), {
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    }
  
    try {
      const userToLogin = await db.User.findOne({ where: { email: req.body.email } });
  
      if (userToLogin) {
        const comparePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
        
        if (comparePassword) {
          req.session.userLogged = userToLogin;
  
          if (req.body.botonremember) {
            res.cookie('userEmail', req.body.email, { maxAge: (1000000 * 90) * 4 });
          }
  
          return res.redirect('/user/profile');
        }
  
        return res.render(path.join(__dirname, '../views/login.ejs'), {
          errors: { password: { msg: 'La contraseña ingresada no es correcta' } },
          oldData: req.body
        });
      } else {
        return res.render(path.join(__dirname, '../views/login.ejs'), {
          errors: { email: { msg: 'El email ingresado no está registrado' } },
          oldData: req.body
        });
      }
    } catch (error) {
      // Manejar errores en caso de que ocurra un problema con la base de datos
      console.log(error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  };
  


  const userProfile = async (req, res) => {
    let user = req.session.userLogged;
    if (user) {
      let userId = user.id;
      try {
        const page = parseInt(req.query.page) || 1; // Página actual
        const perPage = 5; // Cantidad de resultados por página
  
        const totalCount = await db.Order.count({ where: { userId: userId } });
  
        const totalPages = Math.ceil(totalCount / perPage); // Total de páginas
  
        const orders = await db.Order.findAll({
          where: { userId: userId },
          limit: perPage,
          offset: (page - 1) * perPage
        });
  
        res.render(path.join(__dirname, '../views/userProfile.ejs'), {
          user: user,
          orders: orders,
          totalPages: totalPages,
          currentPage: page,
          perPage : perPage
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.redirect('/user/login');
    }
  };

const userLogout = (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/')
}


// CRUD SEQUELIZE USERS

let userControllers = {

    // CREATE SEQUELIZE

 /*    createUserSeq: (req, res) => {

        const resultValidation = validationResult(req);
        if (resultValidation.isEmpty()) {
            db.User.findAll({
                where: { email: req.body.email }
            })
                .then((users) => {

                    // En caso de existir email registrado, se rechaza la promesa
                    if (users.length > 0) {
                        return Promise.reject('El email ya está registrado');
                    } else {
                        return db.User.create({
                            first_name: req.body.nombre,
                            last_name: req.body.apellido,
                            email: req.body.email,
                            password: bcryptjs.hashSync(req.body.password, 10),
                            avatar: req.file.filename ? req.file.filename : ''
                        });
                    }
                })
                .then((user) => {
                    return res.redirect('/');
                    // return res.json({ message: 'Artículo creado con éxito' });
                })
                .catch((error) => {
                    res.render(path.join(__dirname, '../views/register.ejs'), {
                        errors: { email: { msg: 'Este email ya está registrado' } },
                        oldData: req.body,
                    });
                });
        } else {
            // Acá devolvemos los errores
            res.render(path.join(__dirname, '../views/register.ejs'), {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        return res.redirect('/user/login')
    } */
    
    createUserSeq: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.isEmpty()) {
            db.User.findAll({
                where: { email: req.body.email }
            })
                .then((users) => {
                    if (users.length > 0) {
                        throw new Error('El email ya está registrado');
                    } else {
                        return db.User.create({
                            first_name: req.body.nombre,
                            last_name: req.body.apellido,
                            email: req.body.email,
                            password: bcryptjs.hashSync(req.body.password, 10),
                            avatar: req.file ? req.file.filename : null
                        });
                    }
                })
                .then((user) => {
                    // Este código convierte al usuario que acaba de registrarse en el usuario logueado de manera directa
                    // sin tener que pasar por el login.
                    req.session.userLogged = user;
                    res.redirect('/');
                })
                .catch((error) => {
                    if (error.message === 'El email ya está registrado') {
                        return res.render(path.join(__dirname, '../views/register.ejs'), {
                            errors: { email: { msg: 'Este email ya está registrado' } },
                            oldData: req.body,
                        });
                    }
                    // Manejar otros errores aquí
                    res.status(500).send('Error interno del servidor');
                });
        } else {
            res.render(path.join(__dirname, '../views/register.ejs'), {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
    },
    // DELETE USER SEQUELIZE
    /* Se debe utilizar con Postman */

    deleteUserSeq: (req, res) => {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(resultado => {
                return res.status(200).json({ message: 'Usuario eliminado con éxito' });
                // return res.redirect('/')
            })
            .catch(error => {
                // console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            })
    },

    // DESARROLLO API USERS
    // Listado de users
    listUsersAPI: (req, res) => {
        db.User.findAll({
            attributes: { exclude: ['password'] }, // Excluir el atributo 'password'
            order: [['createdAt', 'DESC']] // Orden descendente por createdAt
        }
        )
            .then(users => {
                return res.status(200).json({
                    count: users.length,
                    countByCategory: {},
                    data: users,
                    status: 200
                })
            })
    },

    // User details
    listUserDetailAPI: (req, res) => {
        db.User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] } // Excluir el atributo 'password'
        })
            .then(user => {
                return res.status(200).json({
                    data: user,
                    status: 200
                })
            })
    },

    // User search

    userSearchAPI: (req, res) => {
        const { search } = req.query;
        // console.log(search, 'soy query');

        db.User.findAll({
            where: {
                [Op.or]: [
                    { first_name: { [Op.like]: `%${search}%` } },
                    { last_name: { [Op.like]: `%${search}%` } }
                ]
            },
            attributes: { exclude: ['password'] } // Excluir el atributo 'password'

        }).then(function (users) {
            if (users.length == 0) {
                // No se encontraron usuarios con ese nombre
                return res.status(404).json({ message: "No se encontraron usuarios con ese nombre" });
            }
            // Se encontraron usuarios con ese nombre
            return res.status(200).json(users);
        }).catch(error => {
            console.error("Error en la búsqueda de usuarios:", error);
            return res.status(500).json({ message: "Error en el servidor" });
        });

    }



}





    ;

module.exports = { login, register, passwordreset,/*  processRegister, */ processLogin, userProfile, userLogout, userControllers };
