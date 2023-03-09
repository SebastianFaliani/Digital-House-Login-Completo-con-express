const express = require("express");
const app = express();
const PORT = 3001;
const methodOverride = require("method-override"); // Para poder usar los métodos PUT y DELETE
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(express.static("public"));

/* MIDDLEWARES */
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Para poder usar el metodo POST
app.use(methodOverride("_method")); // Para poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(
      session({
            secret: "Mi Login",
            resave: false,
            saveUninitialized: true,
      })
);
app.use(cookieParser());

/*  Template Engine */
/* Necesario para usar los templates antes instalar npm i  ejs */
app.set("view engine", "ejs");
app.set("views", "./src/views");

/* ROUTERS */
const routerHome = require("./routes/routerHome");
const routerUsers = require("./routes/routerUsers");

/* ROUTERS MIDDLEWARES */
app.use("/", routerHome);
app.use("/users", routerUsers);

app.listen(PORT, () =>
      console.log(`Servidor funcionando en puerto ${PORT} 
http://localhost:${PORT}`)
);
