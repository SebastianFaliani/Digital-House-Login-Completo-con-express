const { check, body } = require("express-validator");
const { readJSON } = require("../database");
const bcryptjs = require("bcryptjs");

const users = readJSON("users.json");
module.exports = [
      check("email").notEmpty().withMessage("El email es obligatorio").bail().isEmail().withMessage("Email invalido"),
      body("email")
            .custom((value) => {
                  let user = users.find((user) => user.email === value);
                  return user !== undefined;
            })
            .withMessage("Usuario o contraseña invalida"),

      check("password").notEmpty().withMessage("Usuario o contraseña invalida"),

      body("password")
            .custom((value, { req }) => {
                  let user = users.find((user) => user.email === req.body.email);
                  return bcryptjs.compareSync(value, user.password);
            })
            .withMessage("Usuario o contraseña invalida"),
      //check("recordar").isString("on").withMessage("Debes aceptar los términos y condiciones"),
];
