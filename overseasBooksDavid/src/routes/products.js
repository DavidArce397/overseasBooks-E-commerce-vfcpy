const express = require('express');
const routerProducts = express.Router();
const { create,
    addBook,
    edit,
    editConfirm,
    deleteBook,
    detailsById,
    database,
    editView,
    shoppingCart,
    buy,
    productsControllers,
    apiEndpoints
} = require('../controllers/productsControllers');
const multerMiddleware = require('../middlewares/multerMiddleware');
const validations = require('../validations/allValidations');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const adminForbiddenMiddleware = require('../middlewares/adminForbiddenMiddleware');
const checkOrderAccess = require('../middlewares/checkOrderAccess');
const { mainControllers } = require('../controllers/mainControllers');
const { checkout, order } = require('../controllers/orderControllers');


routerProducts.get('/products/create', adminMiddleware, authMiddleware, create);
routerProducts.post('/products/create', multerMiddleware.productsUpload.single('img'), validations.productValidations, productsControllers.createBookSeq);
routerProducts.post('/products/search', productsControllers.search);


routerProducts.get('/products/edit/', adminMiddleware, authMiddleware, productsControllers.editViewSeq);

routerProducts.get('/products/edit/:id', adminMiddleware, authMiddleware, productsControllers.editBookSeq);
routerProducts.post('/products/edit/:id', multerMiddleware.productsUpload.single('img'), productsControllers.updateBookSeq);
routerProducts.delete('/products/edit/delete/:id', adminMiddleware, authMiddleware, productsControllers.deleteBookSeq);

routerProducts.get('/products/details/:id', productsControllers.detailCompleto);

routerProducts.get('/database', adminMiddleware, database);

routerProducts.get('/products/cart', authMiddleware, adminForbiddenMiddleware, shoppingCart);

// routerProducts.get('/products/cart/:id', authMiddleware, adminForbiddenMiddleware, buy);

// Checkout route
routerProducts.post('/orders',authMiddleware, checkout);
routerProducts.get('/orders/:id', authMiddleware, checkOrderAccess, order );

// Endpoints API
routerProducts.get('/api/products', apiEndpoints.listProductsAPI);
routerProducts.get('/api/products/searchProduct', apiEndpoints.productSearchAPI);
routerProducts.get('/api/products/:id', apiEndpoints.listProductDetailAPI);
routerProducts.put('/api/products/:id', apiEndpoints.updateProductAPI);

/* routerProducts.post('/api/lock-products-stock', (req, res) => {
    res.json({ success: true, message: 'Stock de productos bloqueado con éxito' });
});
routerProducts.post('/api/unlock-products-stock', (req, res) => {
    res.json({ success: true, message: 'Stock de productos desbloqueado con éxito' });
});
*/





module.exports = routerProducts;
