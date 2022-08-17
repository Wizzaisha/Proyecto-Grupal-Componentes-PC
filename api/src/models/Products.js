const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("products", {
        
        background_image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        marca:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        modelo:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio:{
            type:DataTypes.INTEGER
        },
        description:{
            type: DataTypes.STRING(5000)
        },
        bentchmark:{
            type:DataTypes.INTEGER
        },
        especificaciones:{
            type:DataTypes.STRING(5000)
        },
        categoria:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        stock:{
            type:DataTypes.INTEGER,
            allowNull: false,
        }
    },
    
    
    {
        timestamps: false
    });
};