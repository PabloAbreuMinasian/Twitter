const { mongoose, Schema } = require("../db");

// Crear esquema y modelo User...
const userSchema = new Schema(
  {
    nombre: String,
    apellido: String,
    username: String,
    password: String,
    email: String,
    descripcion: String,
    fotoDePerfil: String,
    tweets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweets",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
