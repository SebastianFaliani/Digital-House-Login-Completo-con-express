const { check } = require("express-validator");

module.exports = [
      check("firstName").notEmpty().withMessage("El nombre es obligatorio").bail().isLength({ min: 3, max: 30 }).withMessage("En nombre debe tener entre 3 y 30 caracteres"),
      check("lastName").notEmpty().withMessage("El apellido es obligatorio").bail().isLength({ min: 3, max: 20 }).withMessage("En apellido debe tener entre 3 y 20 caracteres"),

      check("email").notEmpty().withMessage("El email es obligatorio").bail().isEmail().withMessage("Email invalido"),

      check("avatar").custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = [".jpg,", ".png", ".gif"];
            if (file && !acceptedExtensions.includes(path.extname(file.originalname))) {
                  throw new Error("El avatar tiene que tener extension .jpg .png .gif");
            }
            return true;
      }),
];
