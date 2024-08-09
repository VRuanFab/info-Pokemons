import { useState, useEffect } from "react"
import api from "../../api/api"
import Pokemon_blocks from "../../assets/pokemons_blocks"


import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export default function Homepage(){

    const [arrayPokemons, setArraysPokemon] = useState([])
    const [openModal, setOpenModal] = useState(false)
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
            <div className="w-screen h-screen grid place-items-center">
                <div id="poke-image" className="w-[90%] h-[90%] bg-gray-700 rounded-md relative grid">

                    <div className="w-full h-fit absolute top-[4%] flex justify-end px-[5%]">
                        <input type="search" name="search" id="search_pokemon" className="rounded-full px-3 py-[0.28rem] focus:outline-2 focus:outline outline-offset-0 outline-red-400"/>
                    </div>

                    <div id="pokemon_body" className="w-[90%] h-[85%] mt-[5%] py-2 bg-gray-200 rounded-md place-self-center">
                        <section className="h-[90%] w-full grid px-3 py-2 items-center justify-items-center grid-cols-7 relative">
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

                        <div className="flex justify-end px-9 items-center mt-[2%]">
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