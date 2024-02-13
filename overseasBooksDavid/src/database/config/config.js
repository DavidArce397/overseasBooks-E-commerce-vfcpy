 module.exports = {
  development: {
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    host: process.env.DBHOST,
    dialect: process.env.DIALECT
  },
  test: {
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    host: process.env.DBHOST,
    dialect: process.env.DIALECT
  },
  production: {
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    host: process.env.DBHOST,
    dialect: process.env.DIALECT
  },

  localHost : `http://localhost:${process.env.PORT}`,
  mercado_api_key : process.env.MERCADOPAGO_TOKEN
};


// module.exports = {
//   "development": {
//     "username": process.env.DBUSER,
//     "password": process.env.DBPASSWORD,
//     "database": process.env.DATABASE,
//     "host": process.env.DBHOST,
//     "dialect": process.env.DIALECT
//   },
//   // pruebaaaa

//   "test": {
//     "username": process.env.DBUSER,
//     "password": process.env.DBPASSWORD,
//     "database": process.env.DATABASE,
//     "host": process.env.DBHOST,
//     "dialect": process.env.DIALECT
//   },
//   "username": process.env.DBUSER,
//   "password": process.env.DBPASSWORD,
//   "database": process.env.DATABASE,
//   "host": process.env.DBHOST,
//   "dialect": process.env.DIALECT
// }
