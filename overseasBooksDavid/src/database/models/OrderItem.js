module.exports = (sequelize, dataTypes) => {
    let alias = "OrderItem";

    let cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        orderId : {
            type : dataTypes.INTEGER,
        },
        productId : {
            type : dataTypes.INTEGER
        },
        title : {
            type : dataTypes.STRING
        },
        price : {
            type : dataTypes.DECIMAL(10,2)
        },
        quantity : {
            type : dataTypes.INTEGER
        },
        createdAt: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW
          },
        updatedAt: {
            type: dataTypes.DATE,
          },
        deletedAt: {
            type: dataTypes.DATE,
          }

    };

    

    let config = {
        tableName : "orderItems",
        timestamps : true 
    };

    const OrderItem = sequelize.define(alias, cols, config);

    OrderItem.associate = function(models) {
        OrderItem.belongsTo(models.Order, {
            as : "orders",
            foreignKey : "orderId"
        }),
        OrderItem.belongsTo(models.Book, {
            as : "books",
            foreignKey : "productId"
        })

    }

    return OrderItem;
}