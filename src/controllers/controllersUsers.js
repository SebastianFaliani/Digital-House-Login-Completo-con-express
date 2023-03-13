const { readJSON, writeJSON } = require("../database");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

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
                        id: user.id,
                        name: user.firstName,
                        avatar: user.avatar,
                        typeOfAccess: user.typeOfAccess,
                  };
                  /* Se le asigna la session a local para que lo pueda ver des las vistas ejs */
                  res.locals.user = req.session.user;

                  if (req.body.remember) {
                        //*********Guarar Cookie con tiempo de expiracion 1 hora************
                        let duracionSesion = new Date(Date.now() + 90000);
                        res.cookie("user", req.session.user, { expires: duracionSesion, httpOnly: true });
                  }

                  return res.redirect("/");
            }
            return res.render("users/login", {
                  errors: errors.mapped(),
                  old: req.body,
                  session: req.session,
            });
      },
      logout: (req, res) => {
            req.session.destroy();
            if (req.cookies.user) {
                  //Elimina la cookies poniendo tiempo de expiracion -1
                  res.cookie("user", "", { maxAge: -1 });
            }
            return res.redirect("/");
      },
      register: (req, res) => {
            return res.render("users/register", { session: req.session });
      },
      processRegister: (req, res) => {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                  let lastId;
                  if (dbUsers.length == 0) {
                        lastId = 0;
                  } else {
                        lastId = dbUsers[dbUsers.length - 1].id;
                  }
                  let newUser = {
                        id: lastId + 1,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: bcryptjs.hashSync(req.body.password, 12),
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
                  return res.redirect("/users/login");
            } else {
                  res.render("users/register", {
                        errors: errors.mapped(),
                        old: req.body,
                        session: req.session,
                  });
            }
      },
      profile: (req, res) => {
            let user = dbUsers.find((user) => user.id === req.session.user.id);
            return res.render("users/userProfile", {
                  session: req.session,
                  user,
            });
      },
      profileEdit: (req, res) => {
            let user = dbUsers.find((user) => user.id === req.session.user.id);
            return res.render("users/userProfileEdit", {
                  session: req.session,
                  user,
            });
      },
      profileUpdate: (req, res) => {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                  let user = dbUsers.find((user) => user.id === req.session.user.id);
                  const { firstName, lastName, tel, address, postal_code, province, city } = req.body;

                  user.firstName = firstName;
                  user.lastName = lastName;
                  user.tel = tel;
                  user.address = address;
                  user.postal_code = postal_code;
                  user.province = province;
                  user.city = city;
                  user.avatar = req.file ? req.file.filename : user.avatar;
                  writeJSON("users.json", dbUsers);

                  //req.session.user = user;
                  req.session.user = {
                        id: user.id,
                        name: user.firstName,
                        avatar: user.avatar,
                        typeOfAccess: user.typeOfAccess,
                  };
                  res.redirect("/users/profile");
            } else {
                  let user = dbUsers.find((user) => user.id === req.session.user.id);
                  return res.render("users/userProfileEdit", {
                        session: req.session,
                        user,
                        errors: errors.mapped(),
                  });
            }
      },
};
