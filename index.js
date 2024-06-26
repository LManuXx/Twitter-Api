const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes.js')
const tweetRoutes = require('./routes/tweetRoutes.js')
const comentarioRoutes = require('./routes/comentarioRoutes.js')
const likeRoutes = require('./routes/likeRoutes.js')
const followRoutes = require('./routes/followRoutes.js')
const {PORT} = require('./config.js')

const app = express()

require('./db')()

app.use(express.json())
app.use(cookieParser())
app.use(cors());

app.use('/usuarios', userRoutes)
app.use('/tweets', tweetRoutes)
app.use('/comentarios', comentarioRoutes)
app.use('/likes', likeRoutes)
app.use('/follow',followRoutes)


app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`)
})
