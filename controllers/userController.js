const User = require("../models/User");

// Display a listing of the resource.
async function index(req, res) {
  console.log(req.auth);
  const users = await User.find();
  console.log(users);
  return res.json(users);
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  console.log("accedimos a handler destroy");

  const deletedUser = await User.findOneAndDelete({
    _id: req.params.id,
  });
  return res.json(deletedUser);
}

// Store a newly created resource in storage.
async function store(req, res) {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  });
  await user.save();
  return res.redirect("/usuarios");
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
