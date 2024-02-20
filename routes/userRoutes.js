const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");

router.get(
  "/",
  checkJwt({
    secret: "un string secreto, llevarlo a .env",
    algorithms: ["HS256"],
  }),
  userController.index
);

// router.get("/crear", userController.create);
router.get("/:username", userController.show);

router.post("/", userController.store);

router.delete(
  "/:id",
  checkJwt({
    secret: "string secreto, llevarlo a .env",
    algorithms: ["HS256"],
  }),
  userController.destroy
);

// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);

module.exports = router;
