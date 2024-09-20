import { useState, useEffect } from "react"
import api from "../../api/api"
import Pokemon_blocks from "../../models/pokemons_blocks"
import { FaSearch, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import pokeball_wallpaper2 from "../../assets/pokeball_wallpaper2.jpg"
import pokeball_wallpaper3 from "../../assets/pokeball_wallpaper3.png"
import pokeball_wallpaper4 from "../../assets/pokeball_wallpaper4.jpg"
import pokeball_wallpaper5 from "../../assets/pokeball_wallpaper5.jpg"
import pokeball_wallpaper_dark from "../../assets/pokeball_wallpaper_dark.jpg"
import axios from "axios";

export default function Homepage(){

    const [arrayPokemons, setArraysPokemon] = useState([])
    const [page, setPage] = useState(0)
    const [pokename, setPokename] = useState('')
    const [activeSearch, setActiveSearch] = useState(false)
    const pagination = page * 21

useEffect(() => {
    if (!activeSearch){
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
    } else {
        const fetchPesquisa = async () => {
            const arrResultadoPesquisa = []
            await api.get('/pokemon?limit=100000&offset=0')
        .then((res) => {
            const pokemonsFetch = res.data.results
            pokemonsFetch.filter(async (item) => {
                const {name, url} = item

                if (name.toLowerCase().startsWith(pokename.toLowerCase())){
                    arrResultadoPesquisa.push(item)
                }
            })
            if (arrResultadoPesquisa.length != 0){
                const pokemonsPesquisados = async () => {
                    const promPokeSearch = Array.from({length: arrResultadoPesquisa.length}, (item, i) => {
                        return axios.get(arrResultadoPesquisa[i].url)
                    })

                    const resultPromPoke = await Promise.all(promPokeSearch)

                    if (resultPromPoke.length > 21){
                        const separandoPokemons = []
                        let pageSearch = pagination
                        let ultimoIndex = resultPromPoke.length < pageSearch + 21? resultPromPoke.length : pageSearch + 21
                        console.log(pageSearch, ultimoIndex)

                        for (let i = pageSearch; i < ultimoIndex; i++){
                            separandoPokemons.push(resultPromPoke[i])
                        }

                        let pokemonMap = separandoPokemons.map((pokemon) => ({
                            name: pokemon.data.name,
                            img: pokemon.data.sprites.front_default,
                            id: pokemon.data.id
                        }))
                        setArraysPokemon(pokemonMap)
                    } else {

                        let pokemonMap = resultPromPoke.map((pokemon) => ({
                            name: pokemon.data.name,
                            img: pokemon.data.sprites.front_default,
                            id: pokemon.data.id
                        }))
                        setArraysPokemon(pokemonMap)
                    }
                    
                }
                pokemonsPesquisados()
            } else {
                window.alert('nenhum pokemon encontrado')
            }
        })
        .catch((err) => {
            console.log(err)
        })
        }
        fetchPesquisa()
    }

}, [page, pokename])

async function searchPokemon(isActive){
    setActiveSearch(isActive)
    }
    

    return (
        <>
        <div className={`w-screen h-screen grid justify-center content-center`} style={{backgroundImage: `url(${pokeball_wallpaper2})`}}>
            <div className="w-screen h-screen grid place-items-center">
                <div id="poke-image" className="w-[90%] h-[90%] bg-gray-700 rounded-md relative grid">

                    <div className="w-full h-fit absolute top-[4%] flex justify-end px-[5%]">
                        <div className="px-3 flex items-center bg-white gap-2 w-fit rounded-full">
                            <input type="search" onChange={(e) => {setPokename(e.target.value)}} name="search" id="search_pokemon" className="justify-start py-[0.28rem] focus:outline-0 bg-transparent"/>

                            <FaSearch className="hover:cursor-pointer" onClick={() => {pokename? searchPokemon(true):searchPokemon(false)}}/>
                        </div>
                    </div>

                    <div id="pokemon_body" className="w-[90%] h-[85%] mt-[5%] py-2 bg-gray-200 rounded-md place-self-center">
                        <section className="h-[90%] w-full grid px-3 py-2 items-center justify-items-center grid-cols-7 relative">
                        {
                            arrayPokemons.map((infos) => {
                                return(
                                        <div key={infos.id} className="w-fit h-fit grid text-center">
                                            <Pokemon_blocks nome_pokemon={infos.name} img_pokemon={infos.img}/>
                                        </div>
                                    )
                            })
                        }
                        </section>
                        <div className="flex justify-end px-9 items-center mt-[2%]">
                            {page === 0 ? <></> : <FaCaretLeft onClick={() => setPage(page - 1)} className="hover:cursor-pointer w-7 h-fit"/>} 
                                <label className="text-lg"> {page + 1} </label> 
                            <FaCaretRight onClick={() => setPage(page + 1)} className="hover:cursor-pointer w-7 h-fit"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}