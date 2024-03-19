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
  const users = await User.find();  // traigo toda la lista de usuarios
  const tweets = [];                // creo una lista para llenar

  for (const user of users)          // para cada uno de los usuarios 
    for (let i = 0; i < 1; i++) {     // doy 2 vueltas
      const tweet = new Tweet({         // creo 2 tweets , a c/u lo llamo tweet 
        texto: faker.lorem.paragraph(),   // texto random
        user: user._id,                   // user con valor : user._id 
      });
      tweets.push(tweet);                 // lleno la lista vacia tweets con los 2 tweet creados
      user.tweets.push(tweet._id);       // a cada usuario.tweets le pusheo el tweet._id
      await user.save();
    }
  await Tweet.insertMany(tweets);
  console.log("[Database] Se corrió el seeder de tweets.");
}

module.exports = tweetSeeder;
