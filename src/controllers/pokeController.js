
const fetch = require("node-fetch")
const apiControllerPokemon = {
    index: async (req, res) => {
        let fecthUrl = await fetch("https://pokeapi.co/api/v2/pokemon/")
        let todosLosPokes = await fecthUrl.json()
        let imagenesGuardadas = []
        let typePokemon = [];
        for (let index = 1; index <= 20; index++) {
            let imagesPokesFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
            let imagesPokesJson = await imagesPokesFetch.json()
            imagenesGuardadas.push(imagesPokesJson.sprites.other.home.front_default)
            typePokemon.push(imagesPokesJson.types)
        }

        res.render("home", {
            pokemones: todosLosPokes,
            images: imagenesGuardadas,
            type: typePokemon,

        })
    },
    pokemon: async (req, res) => {
        let fecthUrlTodos = await fetch("https://pokeapi.co/api/v2/pokemon/")
        let todosLosPokes = await fecthUrlTodos.json()

        // Obtén el nombre del Pokémon utilizando el índice
        let pokemonName = todosLosPokes.results[req.params.id - 1].name;

        // Utiliza el nombre para obtener los datos del Pokémon
        let fecthUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        let pokemonSingle = await fecthUrl.json();



        let attack = pokemonSingle.stats.find(stat => stat.stat.name === 'attack');
        let defense = pokemonSingle.stats.find(stat => stat.stat.name === 'defense');
        let specialAttack = pokemonSingle.stats.find(stat => stat.stat.name === 'special-attack');
        let specialDefense = pokemonSingle.stats.find(stat => stat.stat.name === 'special-defense');
        let speed = pokemonSingle.stats.find(stat => stat.stat.name === 'speed');
        let hp = pokemonSingle.stats.find(stat => stat.stat.name === 'hp');

        res.render("pokemon", {
            id: req.params.id,
            namePoke: pokemonName,
            datosPokemon: pokemonSingle,
            typePokemon: pokemonSingle.types,
            hp,
            attack,
            defense,
            specialAttack,
            specialDefense,
            speed
        });
    }
}



module.exports = apiControllerPokemon