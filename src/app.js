const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const authRoute = require("./routes/auth.route");
const accountRoute = require("./routes/account.route");

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/accounts", accountRoute);

module.exports = app;
