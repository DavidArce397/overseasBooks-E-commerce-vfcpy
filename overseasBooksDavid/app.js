require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path')
const publicPath = path.resolve(__dirname, './public')
const morgan = require("morgan");
const routerMain = require('./src/routes/main');
const routerLoginRegister = require('./src/routes/users');
const routerProducts = require('./src/routes/products');
const routerPayments = require('./src/routes/payments');
const port = process.env.PORT || 3001;
const methodOverride = require('method-override');
const session = require('express-session')
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware')
const cookies = require('cookie-parser')


// Configura una redirección para todas las solicitudes que lleguen a la URL de ngrok
app.use((req, res, next) => {
  if (req.hostname === '4ec1-190-231-225-164.ngrok-free.app') {
    return res.redirect(301, 'https://localhost:3001/' );
  }
  next();
});

app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
  }));


app.listen(port, () => console.log(`Server running in port ${port}...`));

app.use(session({
    secret: "It's a secret",
    resave: false,
    saveUninitialized: false
}))
app.use(cookies());
app.use(express.static(publicPath));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
app.use(methodOverride('_method'));
app.use(userLoggedMiddleware)
app.use(routerMain, routerLoginRegister, routerProducts, routerPayments);


app.set("view engine", "ejs");