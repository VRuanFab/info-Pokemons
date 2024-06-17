import { useState } from "react"
import api from "../../api/api"
import Info from "./Info_part"

let pokemon = {}
api.get('pokemon/charizard')
.then((res)  =>  {
    console.log(res.data)
    pokemon.nome = res.data.name
    pokemon.img = res.data.sprites.front_default
})

export default function Homepage(){
    return (
        <>
        <div className="w-screen h-screen grid justify-center content-center">
            <div className="w-screen h-screen flex justify-center">
                <div id="poke-image" className="mt-[3%] w-[90%] h-[90%] bg-gray-700 rounded-md relative flex justify-center">
                    <div className="mt-6 w-[90%] h-[90%] bg-gray-200 rounded-md">

                        <div className="grid text-center w-fit">
                            <img src={pokemon.img} alt="pokeImage" id="pokemon_img"/>
                            <label htmlFor="pokemon_img">{pokemon.nome}</label>
                        </div>

                    </div>
                </div>

                {/* <Info/> */}
            </div>
        </div>
        </>
    )
}