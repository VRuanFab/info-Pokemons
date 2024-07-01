import { useState, useEffect } from "react"
import api from "../../api/api"
import Pokemon_blocks from "../../assets/pokemons_blocks"


export default function Homepage(){

    const [arrayPokemons, setArraysPokemon] = useState([])
    // const [load, setLoad] = useState([])

useEffect(() => {

   const page_pokemons = []
    const pesq_pokemons = async () => {
        try {
            for (let i = 1; i <= 21; i++){
                await api.get(`pokemon/${i}`)
                    .then((res)  =>  {
                        const pokeObj = {
                            name: res.data.name,
                            img: res.data.sprites.front_default,
                            id: res.data.id
                        }
                        page_pokemons.push(pokeObj)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            setArraysPokemon(page_pokemons)
        }catch(err){
            console.log(err)
        }
    }

    pesq_pokemons()
}, [])


    return (
        <>
        <div className="w-screen h-screen grid justify-center content-center">
            <div className="w-screen h-screen flex justify-center">
                <div id="poke-image" className="mt-[3%] w-[90%] h-[90%] bg-gray-700 rounded-md relative flex justify-center">
                    <section id="pokemon_body" className="mt-6 w-[90%] h-[90%] bg-gray-200 rounded-md grid pt-14 pb-10 px-3 items-center justify-items-center grid-cols-7">
                        {
                            arrayPokemons.map((infos) => {
                                return(
                                        <div key={infos.id} className="w-fit h-fit grid text-center hover:cursor-pointer hover:bg-gray-500/30 rounded-lg p-3">
                                            <Pokemon_blocks nome_pokemon={infos.name} img_pokemon={infos.img}/>
                                        </div>
                                    )
                            })
                        }
                    </section>
                </div>

                {/* <Info/> */}
            </div>
        </div>
        </>
    )
}