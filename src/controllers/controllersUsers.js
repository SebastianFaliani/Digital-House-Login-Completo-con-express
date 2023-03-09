const { readJSON, writeJSON } = require("../database");
const { validationResult } = require("express-validator");

const dbUsers = readJSON("users.json");
module.exports = {
      login: (req, res) => {
            return res.render("users/login", { session: req.session });
      },
      processLogin: (req, res) => {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                  let user = dbUsers.find((user) => user.email === req.body.email);
                  req.session.user = {
                        name: user.firstName,
                        avatar: user.avatar,
                        typeOfAccess: user.typeOfAccess,
                  };
                  /* Se le asigna la session a local para que lo pueda ver des las vistas ejs */
                  res.locals.user = req.session.user;

                  return res.redirect("/");
            }
            return res.render("users/login", {
                  errors: errors.mapped(),
                  old: req.body,
                  session: req.session,
            });
      },
      register: (req, res) => {
            return res.render("users/register", { session: req.session });
      },
      processRegister: (req, res) => {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                  let lastId = dbUsers[dbUsers.length - 1].id;
                  let newUser = {
                        id: lastId + 1,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                        avatar: req.file ? req.file.filename : "defauld.png",
                        typeOfAccess: "user",
                        tel: "",
                        address: "",
                        postal_code: "",
                        province: "",
                        city: "",
                  };
                  dbUsers.push(newUser);
                  writeJSON("users.json", dbUsers);
                  return res.redirect("/");
            } else {
                  res.render("users/register", {
                        errors: errors.mapped(),
                        old: req.body,
                        session: req.session,
                  });
            }
      },
};
