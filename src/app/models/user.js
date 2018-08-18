const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  local:{
    nickUser: String,
    password: String
  }
});

// generar hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// Validar password
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
}
// devolvemos el modelo User utilizando el userSchema
module.exports = mongoose.model('User', userSchema);
