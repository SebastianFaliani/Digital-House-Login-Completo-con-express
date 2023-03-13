const router = require("express").Router();
const validatorUsers = require("../validations/validatorUsers");
const validatorUsersUpdate = require("../validations/validatorUsersUpdate");
const validatorLogin = require("../validations/validatorLogin");
const { login, register, processRegister, processLogin, logout, profile, profileEdit, profileUpdate } = require("../controllers/controllersUsers");
const uploadAvatar = require("../middlewares/uploadAvatar");
const userNotSessionCheck = require("../middlewares/userNotSessionCheck");
const userInSessionCheck = require("../middlewares/userInSessionCheck");

/* Login Users */
router.get("/login", userInSessionCheck, login);
router.post("/login", validatorLogin, processLogin);
router.get("/logout", logout);

/* Register Users */
router.get("/register", userInSessionCheck, register);
router.post("/register", uploadAvatar.single("avatar"), validatorUsers, processRegister);

router.get("/profile", userNotSessionCheck, profile);
router.get("/profile/edit", userNotSessionCheck, profileEdit);
/* UPDATE */
router.put("/profile/edit", uploadAvatar.single("avatar"), validatorUsersUpdate, profileUpdate);

//router.put("/editProfile",editProfile);
module.exports = router;
