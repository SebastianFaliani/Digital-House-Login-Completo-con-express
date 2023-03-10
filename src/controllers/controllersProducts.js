module.exports = {
      products: (req, res) => {
            return res.render("products/products", { session: req.session });
      },
      details: (req, res) => {
            return res.render("products/details", { session: req.session });
      },
      ofertas: (req, res) => {
            return res.send("Ofertas");
      },
      masVendidos: (req, res) => {
            return res.send("Mas vendidos");
      },
};
