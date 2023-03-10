const router = require("express").Router();
const { products, details, ofertas, masVendidos } = require("../controllers/controllersProducts");

router.get("/", products);
router.get("/details", details);
router.get("/ofertas", ofertas);
router.get("/masVendidos", masVendidos);

module.exports = router;
