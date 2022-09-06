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
      stock: { type: DataTypes.INTEGER },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      }
    });

};