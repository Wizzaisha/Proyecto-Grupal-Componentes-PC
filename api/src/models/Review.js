const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('review',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        userReview: {
            type: DataTypes.STRING
        },
        userRating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 5
            }
        },
        emailUser: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
        }
    },  {
        timestamps: false
    });

};