import { useState } from "react"
import api from "../../api/api"
// import Info from "./Info_part"

const [pokemon, setPokemon] = useState([])


api.get('pokemon/charizard')
.then((res) => {
    console.log(res.data)
    const poke_class = {}
    poke_class.nome = res.data.name;
    poke_class.img = res.data.sprites.front_default;
    setPokemon(poke_class)
})

export default function Homepage(){
    return (
        <>
        <div className="w-screen h-screen grid justify-center content-center">
            <div className="flex w-screen justify-center content-center">
                <div id="poke-image" className="w-[80%] h-[60rem] bg-gray-600 rounded-md relative flex justify-center">
                    <div className="mt-6 w-[95%] h-[95%] bg-gray-300 rounded-sm">

                        <div className="grid content-center w-fit border-2 text-center">
                            <img id="poke" src={pokemon.img} alt="imagem"/>
                            <label htmlFor="poke"> {pokemon.nome} </label>
                        </div>
                        
                    </div>
                </div>

                {/* <Info/> */}
            </div>
        </div>
        </>
    )
}