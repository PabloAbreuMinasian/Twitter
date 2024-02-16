const { mongoose, Schema } = require("../db");

// Crear esquema y modelo User...
const userSchema = new Schema({
  firstname: String,
  lastname: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
