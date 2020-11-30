const express = require("express");
const pet = require("./pets")
const owner = require("./owner")

const router = new express.Router();
router.use("/owners", pet)
router.use("/owners", owner)


module.exports = router;