const express = require("express");
const connectDB = require("./app_modules/db.js");
const path = require("path");
const exphbs = require("express-handlebars");
var cookieParser = require("cookie-parser");

//DB connection
connectDB();

const app = express();
//Handlebars view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Set Static folder
app.use(express.static(path.join(__dirname, "public")));

//Init Middleware
app.use(cookieParser());
app.use(express.json({ extended: false }));

//Frontend routes
app.use("/login", require("./routes/frontend/login"));
app.use("/logout", require("./routes/frontend/logout"));
app.use("/", require("./routes/frontend"));
app.use("/favorites", require("./routes/frontend/favorites"));
app.use("/disliked", require("./routes/frontend/disliked"));

//API routes
app.use("/api/shop", require("./routes/api/shop"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
