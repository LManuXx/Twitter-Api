const mongoose = require('mongoose');

module.exports = async function () {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/twitter');
    console.log('Base de datos conectada');
  } catch (error) {
    console.log('Error en la base de datos' + error);
  }
};