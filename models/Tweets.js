const { mongoose, Schema } = require("../db");

// Crear esquema y modelo User...
const tweetSchema = new Schema(
  {
    texto: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Tweet = mongoose.model("Tweet", tweetSchema, "tweeties");

module.exports = Tweet;
