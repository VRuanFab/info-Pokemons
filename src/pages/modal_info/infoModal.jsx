import api from "../../api/api"
import { useState, useEffect } from "react"

export default function Info({isOpenModal, closeModal, imgPrincipal, pokeName}){

    const [info, setInfo] = useState([])
    const [evolution, setEvolution] = useState([])
    
    useEffect(() => {
        if (isOpenModal){
            const pokemonInfo = async () => {
                await api.get(`/pokemon/${pokeName}`)
                .then(res => {
                    const objPoke = {
                        id: res.data.id,
                        name: res.data.name,
                        whereFind: res.data.location_area_encounters,
                        height: res.data.height,
                        weight: res.data.weight,
                        forms: res.data.forms,
                        type: res.data.types,
                        species: res.data.species.url
                    }
                    
                    // setInfo(objPoke)

                    const evoPokemon = async () => {
                        await api.get(`${res.data.species.url}`)
                        .then((evolution) => {

                            const nextEvolutionCall = async () => {
                                await api.get(`${evolution.data.evolution_chain.url}`)
                                .then(nextEvo => {

                                    objPoke.firstForm = nextEvo.data.chain.species.name
                                    const evolutionLine = nextEvo.data.chain.evolves_to[0]

                                    if (evolutionLine.evolves_to[0].evolves_to.length != 0){
                                        console.log('evolui')
                                    }
                                    // console.log(evolutionLine.evolves_to[0].evolves_to.length)
                                    console.log(evolutionLine)
                                })
                                .catch(err => console.log(err))
                            }

                            nextEvolutionCall()
                        })
                        .catch(err => {console.log(`erro na api: ${err}`)})
                    }
                    evoPokemon()
                })
                .catch(err => console.log(err))
                
    
            }
            pokemonInfo()
            
            // const evoPokemon = async () => {
            //     await api.get(`${info.species}`)
            //     .then((res) => {
            //         console.log(
            //             res.data
            //             // evolution: res.data.evolution_chain.url
            //         )
            //     })
            //     .catch(err => {console.log(`erro na api: ${err}`)})
            // }
            // evoPokemon()
        }
    }, [isOpenModal])

    if(isOpenModal)
    return(
        <>
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-700/40 w-screen h-screen">
            
            <div className="bg-slate-300 w-[80%] h-[80%] fixed top-[10%] left-[10%] rounded-lg">
                    <div onClick={closeModal} className="border-2 border-black w-full h-fit">X</div>

                <section className="grid grid-cols-2 h-full w-full">

                    <div id="poke-image" className="bg-red-400/90 grid justify-items-center">

                        <div className="h-[80%] grid place-content-center gap-6 self-center">
                            <img src={imgPrincipal} className="w-fit h-60 p-6 border-2 rounded-md"/>
                            <h1 className="font-semibold text-lg capitalize">{pokeName}</h1>
                        </div>

                        <div className="flex w-full h-[80%]">
                            <div className="w-[60%] h-full border-2">
                                evo 1
                            </div>
                        
                            <div className="w-[60%] h-full border-2">
                                evo 2
                            </div>
                        
                            <div className="w-[60%] h-full border-2">
                                evo 3
                            </div>
                        </div>

                    </div>

                    <div id="poke-image" className="bg-red-400/90 grid p-10 gap-4">

                        <div className="border-2">
                            desc
                        </div>

                        <div className="border-2">
                            desc
                        </div>
                    </div>
                    
                </section>
            </div>

        </div>
        </>
    )
}
