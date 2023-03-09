const { check, body } = require("express-validator");
const path = require("path");
const { readJSON } = require("../database");

const users = readJSON("users.json");
module.exports = [
      check("firstName").notEmpty().withMessage("El nombre es obligatorio").bail().isLength({ min: 3, max: 30 }).withMessage("En nombre debe tener entre 3 y 30 caracteres"),
      check("lastName").notEmpty().withMessage("El apellido es obligatorio").bail().isLength({ min: 3, max: 20 }).withMessage("En apellido debe tener entre 3 y 20 caracteres"),

      check("email").notEmpty().withMessage("El email es obligatorio").bail().isEmail().withMessage("Email invalido"),
      body("email")
            .custom((value) => {
                  let user = users.find((user) => user.email === value);
                  return user === undefined;
            })
            .withMessage("Email ya registrado"),

      check("password")
            .notEmpty()
            .withMessage("Debes escribir tu contraseña")
            .bail()
            .isLength({
                  min: 6,
            })
            .withMessage("La contraseña debe tener como mínimo 6 caracteres"),

      body("password2")
            .notEmpty()
            .withMessage("Debes escribir tu contraseña")
            .bail()
            .custom((value, { req }) => (value === req.body.password ? true : false))
            .withMessage("Las contraseñas no coinciden"),

      check("terms").isString("on").withMessage("Debes aceptar los términos y condiciones"),

      check("avatar").custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = [".jpg,", ".png", ".gif"];
            if (file && !acceptedExtensions.includes(path.extname(file.originalname))) {
                  throw new Error("El avatar tiene que tener extension .jpg .png .gif");
            }
            return true;
      }),
];
