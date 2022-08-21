const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) =>
{
  // defino el modelo
  const User = sequelize.define("user",
  {
    id:
    {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {      type: DataTypes.STRING,    },
    email: {      type: DataTypes.STRING,    },
    password: {      type: DataTypes.STRING,    },

  });
  return User;
};