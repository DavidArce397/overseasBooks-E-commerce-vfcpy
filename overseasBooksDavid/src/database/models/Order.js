module.exports = (sequelize, dataTypes) => {
    let alias = "Order";

    let cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        userId : {
            type : dataTypes.INTEGER,
        },
        total : {
            type : dataTypes.DECIMAL(10,2)
        },
        payment_method : {
            type : dataTypes.STRING
        },
        shipping_method : {
            type : dataTypes.STRING
        },
        createdAt: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW
          },
        updatedAt: {
            type: dataTypes.DATE
          },
        deletedAt: {
            type: dataTypes.DATE
          }

    };

    

    let config = {
        tableName : "orders",
        timestamps : true 
    };

    const Order = sequelize.define(alias, cols, config);

    Order.associate = function(models) {
        Order.belongsTo(models.User, {
            as : "users",
            foreignKey : "userId"
        }),
        Order.hasMany(models.OrderItem, {
            as: "orderItems",
            foreignKey: "orderId"
        })

    }

    return Order;
}