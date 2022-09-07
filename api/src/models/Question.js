const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) =>
{
  // defino el modelo
  sequelize.define('question',
  {
    sendUser: { type: DataTypes.TEXT, allowNull: false},
    emailUser: { type: DataTypes.STRING, allowNull: false},
    sendAdmin: { type: DataTypes.TEXT},
    emailAdmin: { type: DataTypes.STRING},
    fecha: { type: DataTypes.DATE, allowNull: false},
    seenByAdmin: { type: DataTypes.BOOLEAN,  defaultValue: false },
    seenByUser: { type: DataTypes.BOOLEAN,  defaultValue: false }
  });

};