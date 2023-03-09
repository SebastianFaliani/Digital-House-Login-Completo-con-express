const router = require("express").Router();
const controllersHome = require("../controllers/controllersHome");
const cookieCheck = require("../middlewares/cookieCheck");

router.get("/", cookieCheck, controllersHome.index);

module.exports = router;
