import { useState, useEffect } from "react"
import api from "../../api/api"
import Pokemon_blocks from "../../assets/pokemons_blocks"


export default function Homepage(){

    const [pokemon, setPokemon] = useState([])

useEffect(() => {

    for (let i = 1; i <= 4; i++){
    api.get(`pokemon/${i}`)
        .then((res)  =>  {
            const pokeObj = {
                name: res.data.name,
                img: res.data.sprites.front_default
            }
            setPokemon(pokeObj)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}, [])



    return (
        <>
        <div className="w-screen h-screen grid justify-center content-center">
            <div className="w-screen h-screen flex justify-center">
                <div id="poke-image" className="mt-[3%] w-[90%] h-[90%] bg-gray-700 rounded-md relative flex justify-center">
                    <div id="pokemon_body" className="mt-6 w-[90%] h-[90%] bg-gray-200 rounded-md">

                        <Pokemon_blocks nome_pokemon={pokemon.name} img_pokemon={pokemon.img}/>
                         
                    </div>
                </div>

                {/* <Info/> */}
            </div>
        </div>
        </>
    )
}