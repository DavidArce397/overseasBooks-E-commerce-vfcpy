let db = require('../database/models');
const Op = db.Sequelize.Op;

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    // console.log('soy email in cookie ' + emailInCookie);

    let userFromCookiePromise = emailInCookie ? db.User.findOne({ where: { email: emailInCookie } }) : Promise.resolve(null);
    
    userFromCookiePromise.then(userFromCookie => {
        // console.log('soy userFromCookie ' + userFromCookie);

        if (userFromCookie) {
            req.session.userLogged = userFromCookie;
        }

        if (req.session && req.session.userLogged) {
            res.locals.isLogged = 'true';
            res.locals.userLogged = req.session.userLogged;
            // console.log(req.session.userLogged);
            // console.log('ADMIN : ' + typeof(res.locals.userLogged.admin) + ' ' + res.locals.userLogged.admin);

            // Verificamos si el usuario tiene role "admin" y lo guardamos en locals para usarlo en las vistas
            if (req.session.userLogged.admin == 'true') {
                res.locals.isAdmin = true;
              } else {
                res.locals.isAdmin = false;
              }
        }

        next();
    }).catch(error => {
        console.log(error);
        next(error);
    });
}

module.exports = userLoggedMiddleware;




