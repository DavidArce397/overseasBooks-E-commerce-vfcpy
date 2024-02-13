const express = require('express');
const routerLoginRegister = express.Router();
const { login,
    register,
    passwordreset,
    processRegister,
    processLogin,
    userProfile,
    userLogout, userControllers } = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');

const guestMiddleware = require('../middlewares/guestMiddleware');
const multerMiddleware = require('../middlewares/multerMiddleware');
const validations = require('../validations/allValidations');
const adminMiddleware = require('../middlewares/adminMiddleware');

routerLoginRegister.get('/user/login', guestMiddleware, login);
routerLoginRegister.post('/user/login', validations.emailValidations, userLoggedMiddleware, processLogin);
routerLoginRegister.get('/user/register', guestMiddleware, register);
routerLoginRegister.post('/user/register', multerMiddleware.usersUpload.single('avatar'), validations.userValidations, userControllers.createUserSeq);
routerLoginRegister.delete('/user/delete/:id', userControllers.deleteUserSeq);
routerLoginRegister.get('/user/passwordreset', passwordreset);
routerLoginRegister.get('/user/profile/:page?', userProfile);
routerLoginRegister.get('/user/logout', userLogout);

// Endpoints API
routerLoginRegister.get('/api/users',userControllers.listUsersAPI);
routerLoginRegister.get('/api/users/searchUser',userControllers.userSearchAPI);
routerLoginRegister.get('/api/users/:id',userControllers.listUserDetailAPI);


module.exports = routerLoginRegister;