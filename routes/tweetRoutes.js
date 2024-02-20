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


router.patch("/:identification/likes", checkJwt({ secret: "string secreto, llevarlo a .env",algorithms: ["HS256"],}),  tweetController.update);

router.delete("/:identification",checkJwt({ secret: "string secreto, llevarlo a .env",algorithms: ["HS256"],}) , tweetController.destroy);

// router.get("/editar/:id", userController.edit);

module.exports = router;
