const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const { expressjwt: checkJwt } = require("express-jwt");

router.get("/", tweetController.index);
// router.get("/crear", userController.create);
// router.get("/:id", userController.show);
router.post(
  "/",
  checkJwt({
    secret: "string secreto, llevarlo a .env",
    algorithms: ["HS256"],
  }),
  tweetController.store
);
// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);
router.delete("/:identification",checkJwt({ secret: "string secreto, llevarlo a .env",algorithms: ["HS256"],}) , tweetController.destroy);

module.exports = router;
