module.exports = (sequelize, dataTypes) => {
    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        avatar: {
            type: dataTypes.STRING
        },
        admin: {
            type: dataTypes.STRING
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
        tableName: "users",
        timestamps: true
    };

    const User = sequelize.define(alias, cols, config);

    // Album.associate = function(models) {
    //     Album.belongsTo(models.Artistas, {
    //         as : "artistas",
    //         foreignKey : "id_artista"
    //     })
    // }

    User.associate = function (models) {
        User.hasMany(models.Order, {
            as: "orders",
            foreignKey: "userId"
        })
    }

    return User;
};