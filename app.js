const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const session = require("express-session");

// Settings ejs
app.set("view engine", "ejs");
app.set("trust proxy", 1);
// Body parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Serve static files
app.use(express.static(__dirname + "/"));
// Create session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
// Routes
app.use("/", require("./routes/home"));
app.use("/cart", require("./routes/cart"));

// Server connections
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening at port: ", process.env.PORT);
});
