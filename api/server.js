require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.APP_PORT || 3000;
const app = express();
const bodyParser = require("body-parser");
const debug = require("debug")("api:server");
app.disable("x-powered-by");
app.use(express.static(path.resolve("./dist/client")));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ type: "text/plain", limit: "50mb" }));
app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));
const userController = require("./src/controller/user.controller");

//routes
let router = express.Router();


router.get("/users", userController.getAllUsers());

router.get("/users/:user_id/friends", userController.getAllUserFriendsById());

router.get("/users/:user_id/friends-of-friends", userController.getAllFriendsOfUserFriendsById());

app.use("/v1/", router);

// Landing page
app.get("*", (req, res) => {
    res.sendFile(path.resolve("./dist/client/index.html"));
});

debug("Starting Server on PORT:", PORT);
app.listen(PORT);

module.exports = app;

