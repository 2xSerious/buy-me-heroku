const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const session = require("express-session");

app.set("view engine", "ejs");
app.set("trust proxy", 1);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(__dirname + "/"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/", require("./routes/home"));
app.use("/cart", require("./routes/cart"));
// app.get("/", function (req, res) {
//   res.render("index");
// });

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening at port: ", process.env.PORT);
});
