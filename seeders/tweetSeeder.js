/**
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 *
 */

const { fakerES: faker } = require("@faker-js/faker");
const User = require("../models/User");
const Tweet = require("../models/Tweets");

async function tweetSeeder() {
  const users = await User.find();
  const tweets = [];

  for (const user of users)
    for (let i = 0; i < 5; i++) {
      const tweet = new Tweet({
        texto: faker.lorem.paragraph(),
        user: user._id,
      });
      tweets.push(tweet);
      user.tweets.push(tweet._id);
      await user.save();
    }
  await Tweet.insertMany(tweets);
  console.log("[Database] Se corrió el seeder de tweets.");
}

module.exports = tweetSeeder;
