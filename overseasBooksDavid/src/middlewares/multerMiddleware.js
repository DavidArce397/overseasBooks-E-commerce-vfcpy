const multer = require('multer');

const path = require('path');

const productsStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/products'))
    },
    filename: (req, file, cb) => {
        const newFile = `/product-${Date.now()}_img${path.extname(file.originalname)}`
        cb(null, newFile)
    }
});

const productsUpload = multer({ storage: productsStorage });


const usersStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/avatars'))
    },
    filename: (req, file, cb) => {
        const newFile = `/product-${Date.now()}_img${path.extname(file.originalname)}`
        cb(null, newFile)
    }
});

const usersUpload = multer({ storage: usersStorage });

module.exports = {

    productsStorage,
    productsUpload,
    usersStorage,
    usersUpload
    
}