const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) =>
{
  // defino el modelo
  sequelize.define('comment',
  {
    comentario: { type: DataTypes.TEXT}, 
    email: { type: DataTypes.STRING}
  });

};