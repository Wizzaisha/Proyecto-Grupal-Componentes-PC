const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) =>
{
  // defino el modelo
  sequelize.define('product',
  {
    marca: { type: DataTypes.STRING, allowNull: false},
    modelo: { type: DataTypes.STRING , allowNull: false},
    imagen: { type: DataTypes.TEXT },
    descripcion: { type: DataTypes.TEXT },
    especificaciones: { type:DataTypes.ARRAY(DataTypes.STRING), },
    benchmark: { type: DataTypes.INTEGER },
    precio: { type: DataTypes.INTEGER },
    stock: { type: DataTypes.INTEGER },
  });

};