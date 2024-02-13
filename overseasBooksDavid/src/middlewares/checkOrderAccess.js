let db = require('../database/models');
const Op = db.Sequelize.Op;

// Este middleware sirve para que un usuario solo tenga acceso a las rutas con sus propias órdenes.
// Por ejemplo si el usuario tiene un userId = 1 , no podrá ver las órdenes del userId = 2.

const checkOrderAccess = (req, res, next) => {
    const user = req.session.userLogged;
    const orderId = req.params.id;
    console.log('soy order id : ' + orderId);
  
    // Verificar si el usuario está autenticado
    if (!user) {
      return res.redirect('/user/login'); 
    }
  
    // Verificar si el usuario tiene acceso al pedido solicitado
    db.Order.findOne({
      where: { id: orderId, userId: user.id },
    })
      .then((order) => {
        if (!order) {
          return res.status(403).send('Acceso denegado');
        }
        // El usuario tiene acceso al pedido
        next();
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send('Error de servidor'); 
      });
  };


  module.exports = checkOrderAccess;
