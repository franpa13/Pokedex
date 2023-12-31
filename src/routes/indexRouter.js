const express = require('express');
const router = express.Router();
const apiControllerPokemon = require(`../controllers/pokeController.js`)

// GET HOME PAGE
router.get("/", apiControllerPokemon.index)
router.get("/pokemon/:id",apiControllerPokemon.pokemon)

// SEGUNDA PAGINA
router.get("/pageDos",apiControllerPokemon.pageDos)
router.get("/pokemonPageDos/:id",apiControllerPokemon.pokemonPageDos)

// SEARCH POKEMON
router.get("/search" , apiControllerPokemon.search)

module.exports = router