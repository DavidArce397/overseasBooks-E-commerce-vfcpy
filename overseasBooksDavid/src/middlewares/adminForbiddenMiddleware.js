const User = require('../models/User');
const path = require('path');

function adminForbiddenMiddleware(req, res, next) {
    if (res.locals.isAdmin) {
        res.render(path.join(__dirname,'../views/forbidden.ejs'));
    } else {
        next();
    }
}

module.exports = adminForbiddenMiddleware;