/**
 * Nota: en el caso de estar creando una API, los métodos `create` y `edit`
 * no serían necesarios ya que los mismos se usan en proyecto con server-side
 * rendering para mostrar los formularios de crear y editar, respectivamente.
 *
 * Por lo tanto, al crear una API, los únicos métodos que serían necesarios
 * son: index, show, store, update y destroy.
 */
const Tweet = require("../models/Tweets");
const User = require("../models/User");

// Display a listing of the resource.
async function index(req, res) {
  const tweets = await Tweet.find().sort({ createdAt: -1 }); // Ordena x fecha de creación descendente
  const lastTweets = tweets.slice(0, 20); // ultimos 20
  return res.json(lastTweets);
}

// Store a newly created resource in storage.
async function store(req, res) {
  const newTweet = new Tweet({
    texto: req.body.text,
    user: req.auth.sub,
  });
  await newTweet.save();

  return res.json(newTweet);
}

// Update the specified resource in storage.
async function update(req, res) {
  
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  console.log("estamos en destroy funciton ");
  const tweetBorrado = await Tweet.findByIdAndDelete(req.params.identification);
  return res.json(tweetBorrado)
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
//async function create(req, res) {}

// Show the form for editing the specified resource.
//async function edit(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  //create,
  store,
  //edit,
  update,
  destroy,
};
