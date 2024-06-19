import { useState, useEffect } from "react"
import api from "../../api/api"
import Info from "./Info_part"

// let pokemon = {}
// api.get('pokemon/charizard')
// .then((res)  =>  {
//     console.log(res.data)
//     pokemon.nome = res.data.name
//     pokemon.img = res.data.sprites.front_default
// })
// .catch((err) => {
//     console.log(err)
// })

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

            const divPoke = document.createElement('div')
            divPoke.className = "grid text-center w-fit"
            
            const imgPoke = document.createElement('img')
            imgPoke.src = res.data.sprites.front_default
            imgPoke.alt = "pokeImage"
            imgPoke.id = `pokemon_img`
            
            const labelPoke = document.createElement('label')
            labelPoke.htmlFor=`pokemon_img`
            labelPoke.textContent = pokemon.name

            divPoke.appendChild(imgPoke)
            divPoke.appendChild(labelPoke)
            document.getElementById('pokemon_body').appendChild(divPoke)
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

                        {/* <div className="grid text-center w-fit">
                            <img src={pokemon.img} alt="pokeImage" id="pokemon_img"/>
                            <label htmlFor="pokemon_img">{pokemon.name}</label>
                        </div> */}
                    </div>
                </div>

                {/* <Info/> */}
            </div>
        </div>
        </>
    )
}