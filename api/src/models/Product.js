const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product',
    {
      brand: { type: DataTypes.STRING, allowNull: false },
      model: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.TEXT },
      description: { type: DataTypes.TEXT },
      specs: { type: DataTypes.ARRAY(DataTypes.STRING), },
      benchmark: { type: DataTypes.INTEGER },
      price: { type: DataTypes.FLOAT }, 
      points : { type: DataTypes.FLOAT},
      buyers: { type: DataTypes.FLOAT},
      rating: { type: DataTypes.VIRTUAL , defaultValue: 0,
               get(){ return this.points / this.buyers}   },
      stock: { type: DataTypes.INTEGER },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }

    });

};