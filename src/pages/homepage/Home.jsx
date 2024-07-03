import { useState, useEffect } from "react"
import api from "../../api/api"
import Pokemon_blocks from "../../assets/pokemons_blocks"


export default function Homepage(){

    const [arrayPokemons, setArraysPokemon] = useState([])
    const [page, setPage] = useState(1)
    const [pageMultiplier, setPageMultiplier] = useState(0)

useEffect(() => {
        const page_pokemons = []

    const pesq_pokemons = async () => {
        try {
            for (let i = 0; i <= 20; i++){
                await api.get(`pokemon/${i + page}`)
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
                    <div id="pokemon_body" className="mt-6 w-[90%] h-[90%] bg-gray-200 rounded-md">
                        <section className="h-[90%] w-full mt-10 grid px-3 items-center justify-items-center grid-cols-7 relative">
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

                        <div className="absolute right-[11%]">
                            {`< ${page} >`}
                        </div>
                    </div>
                </div>

                {/* <Info/> */}
            </div>
        </div>
        </>
    )
}