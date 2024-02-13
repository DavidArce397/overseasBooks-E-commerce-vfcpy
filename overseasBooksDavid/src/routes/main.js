const express = require('express');
const routerMain = express.Router();
const {main, mainControllers} = require('../controllers/mainControllers');


routerMain.get('/', main);
routerMain.get('/autores', mainControllers.listBooks);


module.exports = routerMain;

