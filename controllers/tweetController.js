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
  const tweets = await Tweet.find().sort({ createdAt: -1 }).populate("user"); // Ordena x fecha de creación descendente
  const lastTweets = tweets.slice(0, 20); // ultimos 20
  return res.json(lastTweets);
}

// Store a newly created resource in storage.
async function store(req, res) {
  const user = await User.findById(req.auth.sub);
  const newTweet = new Tweet({
    texto: req.body.text,
    user: req.auth.sub,
  });
  await newTweet.save();

  await user.tweets.push(newTweet);
  await user.save();

  return res.json(newTweet);
}

// Update the specified resource in storage.
async function update(req, res) {
  console.log("accedimos a la update function");

  const tweetToUpdate = await Tweet.findById(req.params.identification);

  if (!tweetToUpdate) {
    return res.json({ msg: "couldnt find the tweet man" });
  }

  if (tweetToUpdate.likes.includes(req.auth.sub)) {
    console.log("estamos aqui");
    console.log(tweetToUpdate.likes);

    tweetToUpdate.likes.pull(req.auth.sub);

    return res.json({
      likes: tweetToUpdate.likes,
      likesCount: tweetToUpdate.likes.length,
    });
  }

  tweetToUpdate.likes.push(req.auth.sub);
  tweetToUpdate.save();

  const tweetCount = tweetToUpdate.likes.length;
  return res.json({ tweetCount: tweetCount, likes: tweetToUpdate.likes });
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  console.log("estamos en destroy funciton ");
  const tweetToDelete = await Tweet.findById(req.params.identification);

  if (req.auth.sub !== String(tweetToDelete.user)) {
    return res.json({ msg: "You cannot delete other users tweets" });
  }

  const tweetBorrado = await Tweet.findByIdAndDelete(req.params.identification);
  return res.json({
    msg: "el tweet ha sido borrado",
    tweetBorrado: tweetBorrado,
  });
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
