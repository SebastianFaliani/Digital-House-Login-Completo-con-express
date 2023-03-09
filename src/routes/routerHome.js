const router = require("express").Router();
const controllersHome = require("../controllers/controllersHome");

router.get("/", controllersHome.index);

module.exports = router;
