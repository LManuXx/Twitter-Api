const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config')

const generarToken = (usuarioId) => {
    return jwt.sign({id:usuarioId}, jwtSecret, {expiresIn: '200h'})
}

const verificarToken = (token) => {
    return jwt.verify(token, jwtSecret)
}

module.exports = {
    generarToken,
    verificarToken
}