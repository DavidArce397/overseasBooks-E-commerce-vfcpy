const User = require('../models/User');
const path = require('path');

function adminMiddleware(req, res, next) {
    if (res.locals.isAdmin) {
        next();
        
    } else {
        res.render(path.join(__dirname,'../views/forbidden.ejs'))
        // res.redirect('/')
    }
}

module.exports = adminMiddleware;