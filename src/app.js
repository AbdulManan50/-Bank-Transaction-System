const express = require("express");
const cookiesParser = require("cookie-parser");

const app = express();


const authRoute = require("./routes/auth.route");

app.use(express.json());

app.use("/api/auth", authRoute);
app.use(cookiesParser());

module.exports = app;
