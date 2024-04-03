const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config')

const generarToken = (usuarioId) => {
    const token = jwt.sign({id:usuarioId}, jwtSecret, {expiresIn: '200h'})
    console.log(token)
    return token
}

const verificarToken = (token) => {
    const verification = jwt.verify(token, jwtSecret)
    return verification
}

module.exports = {
    generarToken,
    verificarToken
}