import { useState, useEffect } from "react"
import api from "../../api/api"
import Pokemon_blocks from "../../assets/pokemons_blocks"


import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export default function Homepage(){

    const [arrayPokemons, setArraysPokemon] = useState([])
    const [page, setPage] = useState(1)
    // const [pageMultiplier, setPageMultiplier] = useState(0)

useEffect(() => {
        const pokemons_show = []

    async function self_pokemon() {
        try {
            for (let i = 1; i <= 21; i++){
            // await api.get(`pokemon/${i + (page * 21)}`)
            await api.get(`pokemon/${i + (page * 21)}`)
                    .then((res)  =>  {
                        const pokeObj = {
                            name: res.data.name,
                            img: res.data.sprites.front_default,
                            id: res.data.id
                        }
                        pokemons_show.push(pokeObj)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
                setArraysPokemon(pokemons_show)
        }catch(err){
            console.log(err)
        }
    }

    self_pokemon()
}, [page])


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

                        <div className="absolute right-[11%] flex items-center">
                            {page === 0 ? <></> : <FaCaretLeft onClick={() => setPage(page - 1)} className="hover:cursor-pointer"/>} {page} <FaCaretRight onClick={() => setPage(page + 1)} className="hover:cursor-pointer"/>
                        </div>
                    </div>
                </div>

                {/* <Info/> */}
            </div>
        </div>
        </>
    )
}