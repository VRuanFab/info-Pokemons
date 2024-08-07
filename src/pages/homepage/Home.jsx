import { useState, useEffect } from "react"
import api from "../../api/api"
import Pokemon_blocks from "../../assets/pokemons_blocks"


import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export default function Homepage(){

    const [arrayPokemons, setArraysPokemon] = useState([])
    const [page, setPage] = useState(0)
    const pagination = page * 21
useEffect(() => {

    const fetchPokemon = async () => {
        const pokePromise = Array.from({ length: 21 }, (v, i) => {
            return api.get(`pokemon/${i + 1 + pagination}`)
        })

        const results = await Promise.all(pokePromise)

        const pokemons_show = results.map(res => ({
            name: res.data.name,
            img: res.data.sprites.front_default,
            id: res.data.id
        }))
        setArraysPokemon(pokemons_show)
    }
    fetchPokemon()
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
                            {page === 0 ? <></> : <FaCaretLeft onClick={() => setPage(page - 1)} className="hover:cursor-pointer"/>} {page + 1} <FaCaretRight onClick={() => setPage(page + 1)} className="hover:cursor-pointer"/>
                        </div>
                    </div>
                </div>

                {/* <Info/> */}
            </div>
        </div>
        </>
    )
}