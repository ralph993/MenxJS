const express = require("express");
const router = express.Router();
const { helloWord } = require("./index.controller");
const {} = require("./index.middleware");

router.get("/", helloWord);

module.exports = router;
