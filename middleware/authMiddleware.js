const jwt = require('jsonwebtoken');
const {verificarToken} = require('../handlers/jwt.js')

const verificarToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ mensaje: 'No se proporcionó un token' });
  }

  try {
    const usuario = verificarToken(token)
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};

module.exports = { verificarToken };
