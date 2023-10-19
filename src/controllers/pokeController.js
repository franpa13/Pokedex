
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
        let pokemonName = null;
        if (todosLosPokes.results && todosLosPokes.results[req.params.id - 1]) {
            pokemonName = todosLosPokes.results[req.params.id - 1].name;
        } else {
            // Aquí puedes manejar el caso en el que no se encuentra un Pokémon en esa posición.
            console.error(`No se encontró un Pokémon en la posición ${req.params.id - 1}`);
        }
        

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
    },
    pageDos: async (req, res) => {
        try {
            // Realiza una solicitud a la API para obtener la información de la segunda página
            const offset = 20; // Ajusta el offset según tu paginación
            const limit = 20;  // Ajusta el límite según tu paginación
            const fecthUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
            const todosLosPokes = await fecthUrl.json();
            const imagenesGuardadas = [];
            const typePokemon = [];
    
            // Obtiene imágenes y tipos de los Pokémon de la segunda página
            for (let index = offset + 1; index <= offset + limit; index++) {
                const imagesPokesFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
                const imagesPokesJson = await imagesPokesFetch.json();
                imagenesGuardadas.push(imagesPokesJson.sprites.other.home.front_default);
                typePokemon.push(imagesPokesJson.types);
            }
    
            // Renderiza la página pageDos con los datos de la segunda página
            res.render("pageDos", {
                pokemones: todosLosPokes,
                images: imagenesGuardadas,
                type: typePokemon,
            });
        } catch (error) {
            console.error('Error al cargar la página pageDos:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    pokemonPageDos: async (req, res) => {
        try {
            const pokemonIndex = parseInt(req.params.id); // Convierte el índice a un número entero
            const offset = 20; // Ajusta el offset según tu paginación
            const limit = 20;  // Ajusta el límite según tu paginación
    
            // Realiza una solicitud a la API para obtener la información de la segunda página
            const fetchUrl = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
            const pokemones = await fetchUrl.json(); // Almacena los datos en la variable 'pokemones'
    
            // Realiza una solicitud adicional para obtener las imágenes de los Pokémon y almacénalas en 'images'
            // Por ejemplo, asumiendo que las imágenes provienen de la misma API
            const imageUrls = pokemones.results.map(pokemon => pokemon.url);
            const imagesResponse = await Promise.all(imageUrls.map(url => fetch(url)));
            const imagesData = await Promise.all(imagesResponse.map(response => response.json()));
            const images = imagesData.map(data => data.sprites.front_default);
    
            // Realiza una solicitud adicional para obtener la información de los tipos de Pokémon
            // Por ejemplo, asumiendo que los tipos de Pokémon se obtienen de la misma API
            const typeUrls = pokemones.results.map(pokemon => pokemon.url);
            const typeResponse = await Promise.all(typeUrls.map(url => fetch(url)));
            const typeData = await Promise.all(typeResponse.map(response => response.json()));
            const type = typeData.map(data => data.types);
    
            // Resto del código para obtener estadísticas y demás información
    
            // Agrega registros de depuración para verificar datos
            console.log(pokemones);
            console.log(images);
            console.log(type);
    
            // Verifica si el índice del Pokémon solicitado es válido
            if (pokemonIndex >= 1 && pokemonIndex <= pokemones.results.length) {
                const pokemonSingle = await fetch(pokemones.results[pokemonIndex - 1].url);
                const pokemonData = await pokemonSingle.json();
    
                // Resto del código para obtener estadísticas y demás información
                // Supongamos que los datos de las estadísticas están disponibles en el objeto pokemonData
                const { stats } = pokemonData;
    
                const hp = stats.find(stat => stat.stat.name === 'hp');
                const attack = stats.find(stat => stat.stat.name === 'attack');
                const defense = stats.find(stat => stat.stat.name === 'defense');
                const specialAttack = stats.find(stat => stat.stat.name === 'special-attack');
                const specialDefense = stats.find(stat => stat.stat.name === 'special-defense');
                const speed = stats.find(stat => stat.stat.name === 'speed');
    
                // Resto del código para renderizar la página
                res.render("pokemonPageDos", {
                    id: parseInt(req.params.id), // Convierte req.params.id a un número
                    namePoke: pokemones.results[pokemonIndex - 1].name,
                    datosPokemon: pokemonData,
                    typePokemon: type[pokemonIndex - 1],
                    hp,
                    attack,
                    defense,
                    specialAttack,
                    specialDefense,
                    speed,
                    images: images[pokemonIndex - 1]
                });
                
            } else {
                // Si el índice no es válido, puedes manejarlo de manera adecuada
                res.status(404).send('Pokemon no encontrado');
            }
        } catch (error) {
            console.error('Error al cargar la página pokemonPageDos:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    search: async (req, res) => {
        const { keywords } = req.query;
        let fetchUrlUno = await fetch("https://pokeapi.co/api/v2/pokemon/");
        let todosLosPokesUno = await fetchUrlUno.json();
        const fetchUrlDos = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20");
        let todosLosPokesDos = await fetchUrlDos.json();
        const arrayWhitNamesUno = todosLosPokesUno.results;
        const arrayWhitNamesTwo = todosLosPokesDos.results;
    
        // Combinar los dos arrays de nombres
        const combinedArray = arrayWhitNamesUno.concat(arrayWhitNamesTwo);
    
        // Obtener la información de cada Pokémon, incluyendo tipos, imagen e ID
       // Obtener la información de cada Pokémon, incluyendo tipos, imagen e ID
const pokemonData = combinedArray.map((pokemon, index) => {
    return fetch(pokemon.url)
        .then(response => response.json())
        .then(data => {
            return {
                id: index + 1, // Genera un ID basado en la posición en el array (sumando 1 para que comience en 1)
                name: pokemon.name,
                image: data.sprites.front_default,
                types: data.types.map(typeInfo => typeInfo.type.name)
            };
        })
        .catch(error => {
            console.error(`Error al obtener datos del Pokémon ${pokemon.name}: ${error}`);
            return null; // Devuelve null para los Pokémon que no se pudieron obtener
        });
});

    
        // Esperar a que se resuelvan todas las promesas de fetch y luego continuar
        const pokemonSearch = await Promise.all(pokemonData);
    
        // Filtra los Pokémon por coincidencia con las palabras clave
        const pokemonFiltrado = pokemonSearch.filter((pokemon) => pokemon.name.toLowerCase().includes(keywords.toLowerCase()));
    
        res.render("results", { pokemon: pokemonFiltrado, keywords: keywords }); // Envía los resultados y las palabras clave a la vista
    }
    
    

    
    
    
}


module.exports = apiControllerPokemon