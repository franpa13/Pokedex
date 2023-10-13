
const fetch = require("node-fetch")
const apiControllerPokemon = {
    index:  (req,res)=>{
        res.render("home")
    }, 
    // list : async (req,res)=>{
    //     let fecthUrl = await fetch("https://pokeapi.co/api/v2/pokemon/")
    //     let jsonfetch = await fecthUrl.json()
    //     res.render("home",{pokemones : jsonfetch})
        
    // }
}


module.exports = apiControllerPokemon