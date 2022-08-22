const config = require("../Auth/authConfig");
const { v4: uuidv4 } = require("uuid");
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) =>
{
  const RefreshToken = sequelize.define("refreshToken", 
  {
    token: { type: DataTypes.STRING },
    expiryDate: { type: DataTypes.DATE },
  });

  RefreshToken.createToken = async function (user) 
  {
    let expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);
    let _token = uuidv4();
    let refreshToken = await this.create(
      {
      token: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
      });
    return refreshToken.token;
  };// puedo usar o RefreshToken.createToken(usuario) -> retorna el atributo token generado
  // o RefreshToken.verifyExpiration(token[devuelto por RefreshToken.createToken(user)]) -> retorna true si expiro

  RefreshToken.verifyExpiration = (token) => {return token.expiryDate.getTime() < new Date().getTime(); };

return RefreshToken; // devuelvo verifyExpiration(devuelve booleano) y createToken(devuleve solo token)
};