const router = require("express").Router();
const validatorUsers = require("../validations/validatorUsers");
const validatorLogin = require("../validations/validatorLogin");
const { login, register, processRegister, processLogin, logout } = require("../controllers/controllersUsers");
const uploadAvatar = require("../middlewares/uploadAvatar");

/* Login Users */
router.get("/login", login);
router.post("/login", validatorLogin, processLogin);
router.get("/logout", logout);

/* Register Users */
router.get("/register", register);
router.post("/register", uploadAvatar.single("avatar"), validatorUsers, processRegister);

module.exports = router;
