const express = require('express');
const router = express.Router();
const apiControllerPokemon = require(`../controllers/pokeController.js`)

// GET HOME PAGE
router.get("/", apiControllerPokemon.index)


module.exports = router