require("dotenv").config();
const express = require("express");
const PORT = process.env.APP_PORT || 3000;
const app = express();
const bodyParser = require("body-parser");
const debug = require("debug")("api:server");
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ type: "text/plain", limit: "50mb" }));
app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));

const userController = require("./src/controller/user.controller");
//routes
let router = express.Router();


router.get("/users", userController.getAllUsers());

router.get("/users/:user_id/friends", userController.getAllUserFriendsById());


app.use("/v1/", router);

// app.use("*", ec.notFound());
// app.use(ec.defaultErrorHandler());

debug("Starting Server on PORT:", PORT);
app.listen(PORT);

module.exports = app;

