module.exports = (sequelize, dataTypes) => {
    let alias = "Book";

    let cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        title : {
            type : dataTypes.STRING
        },
        price : {
            type : dataTypes.DECIMAL(10,2)
        },
        stock : {
            type : dataTypes.INTEGER
        },
        img : {
            type : dataTypes.STRING
        },
        author_id : {
            type : dataTypes.INTEGER
        },
        category_id : {
            type : dataTypes.INTEGER
        },
        description : {
            type : dataTypes.TEXT
        },
         color : {
            type : dataTypes.STRING
        },
        shippingPrice1 : {
            type : dataTypes.DECIMAL(10,2)
        },
        shippingPrice2 : {
            type : dataTypes.DECIMAL(10,2)
        },
        pickingPrice : {
            type : dataTypes.DECIMAL(10,2)
        },
        createdAt: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW
          },
        updatedAt: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW
          }

    };

    

    let config = {
        tableName : "books",
        timestamps : true 
    };

    const Book = sequelize.define(alias, cols, config);

    Book.associate = function(models) {
        Book.belongsTo(models.Category, {
            as : "categories",
            foreignKey : "category_id"
        }),

        Book.belongsTo(models.Author, {
            as : "authors",
            foreignKey : "author_id"
        }),

        Book.hasMany(models.OrderItem, {
            as: "orderItems",
            foreignKey: "productId"
        })

    }

    return Book;
}