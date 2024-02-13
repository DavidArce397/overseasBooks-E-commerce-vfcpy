const path = require('path');

let db = require('../database/models');
const Op = db.Sequelize.Op;

const { validationResult } = require('express-validator');
const {localHost, mercado_api_key} = require('../database/config/config');
const mercadopago = require('mercadopago');

let paymentControllers = {
    createPayment : async (req, res) => {

        const { items } = req.body;


        mercadopago.configure({
            access_token : mercado_api_key
        });

       const result = await mercadopago.preferences.create({

            items : items,

            // back_urls : {
                // success : `${localHost}/success`,
            //     failure : `${localHost}/failure`,
            //     pending : `${localHost}/pending`
            // },

            back_urls : {
                success : `https://overseasbooks-ecommerce.onrender.com/success`,
                failure : `https://overseasbooks-ecommerce.onrender.com/failure`,
                pending : `https://overseasbooks-ecommerce.onrender.com/pending`
            },

            // Utilizo ngrok para hacer enviar los datos de la operación de manera segura por medio de protocolo https.
            // notification_url : `https://4ec1-190-231-225-164.ngrok-free.app/webhook`
            notification_url : `https://overseasbooks-ecommerce.onrender.com/webhook`
        });

        console.log(result);

        res.send(result.body);
    },
    successPayment : (req, res) => {
        let { payment_id } = req.query;

        res.render(path.join(__dirname, '../views/success'), {paymentId : payment_id});
        // res.send('Success')
    },
    failurePayment : (req, res) => {
        let { payment_id } = req.query;

        res.render(path.join(__dirname, '../views/rejected'), {paymentId : payment_id});
        // res.send('Failure')
    },
    pendingPayment : (req, res) => {
        let { payment_id } = req.query;
    
        res.render(path.join(__dirname, '../views/pending'), {paymentId : payment_id});
        // res.send('Pending')
    },
    receiveWebhook : async (req, res) => {

        // El webhook nos indica el estado del pago
        const payment = req.query; //La url modifica el query string en base al estado del pago (success, pending, failure)

        try {
            if (payment.type == "payment") {
                const data = await mercadopago.payment.findById(payment["data.id"]);
                console.log(data);
            }
            res.sendStatus(204);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500).json({ error : error.message });
        }
    }
};




module.exports = {paymentControllers};