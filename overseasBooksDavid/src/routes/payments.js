const express = require('express');
const routerPayments = express.Router();
const validations = require('../validations/allValidations');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const checkOrderAccess = require('../middlewares/checkOrderAccess');
const { mainControllers } = require('../controllers/mainControllers');
const { paymentControllers } = require('../controllers/paymentControllers');
const { checkout, order } = require('../controllers/orderControllers');


routerPayments.post('/create-order', paymentControllers.createPayment);
routerPayments.get('/success', paymentControllers.successPayment);
routerPayments.get('/failure', paymentControllers.failurePayment);
routerPayments.get('/pending', paymentControllers.pendingPayment);
routerPayments.post('/webhook', paymentControllers.receiveWebhook); 




module.exports = routerPayments;


