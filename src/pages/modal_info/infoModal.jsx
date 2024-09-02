import api from "../../api/api"
import { useState, useEffect } from "react"
import { IoMdClose } from "react-icons/io";

export default function Info({isOpenModal, closeModal, imgPrincipal, pokeName}){

    const [info, setInfo] = useState({})
    const [evolution, setEvolution] = useState([])
    
    useEffect(() => {
        if (isOpenModal  === true){
            const pokemonInfo = async (nome) => {
                await api.get(`/pokemon/${nome}`)
                .then(res => {
                    console.log(res)
                    const objPoke = {
                        id: res.data.id,
                        name: res.data.name,
                        whereFind: res.data.location_area_encounters,
                        height: res.data.height,
                        weight: res.data.weight,
                        forms: res.data.forms,
                        type: res.data.types,
                        species: res.data.species.url,
                        status_base: res.data.stats
                    }
                    
                    const evoPokemon = async () => {
                        await api.get(`${res.data.species.url}`)
                        .then((evolution) => {

                            const nextEvolutionCall = async () => {
                                await api.get(`${evolution.data.evolution_chain.url}`)
                                .then(nextEvo => {
                                    objPoke.firstForm = nextEvo.data.chain.species.name
                                    
                                    const arrEvo = []

                                    if (nextEvo.data.chain.evolves_to.length > 0){

                                        const evolutionLine = nextEvo.data.chain.evolves_to[0]
                                        const continueEvo = evolutionLine.evolves_to

                                        arrEvo.push(evolutionLine.species.name)

                                        
                                        if(continueEvo.length > 0){
                                            arrEvo.push(continueEvo[0].species.name)
                                        }
                                        objPoke.nextForm = arrEvo
                                        setInfo(objPoke)
                                        
                                        arrEvo.push(objPoke.firstForm)

                                            const pokemonEvoInfo = async () => {
                                                let arrInfoEvo = []
        
                                                arrEvo.map(item => {
                                                    arrInfoEvo.push(api.get(`/pokemon/${item}`))
                                                })
                                                const resultInfo = await Promise.all(arrInfoEvo)
        
                                                let arrResponse = []
                                                resultInfo.map(item => {
                                                    const objPoke = {
                                                                id: item.data.id,
                                                                name: item.data.name,
                                                                img: item.data.sprites.front_default
                                                            }
                                                            arrResponse.push(objPoke)
                                                })
                                                setEvolution(arrResponse)
                                            }
                                            pokemonEvoInfo()
                                    }
                                    else {
                                        setInfo(objPoke)
                                    }
                                })
                                .catch(err => console.log(`Erro na busca de evolução: ${err}`))
                            }
                            nextEvolutionCall()
                        })
                        .catch(err => {console.log(`Erro na busca de evolução: ${err}`)})
                    }
                    evoPokemon()
                })
                .catch(err => console.log(`Erro na busca de informações gerais: ${err}`))
            }
            pokemonInfo(pokeName)
            .catch((err) => {
                console.log(err)
            })
        }
    }, [isOpenModal])


    // deixa essa função escondida, ela só serve pra colorir o fundo do tipo de pokemon
    function coloring_types(type){
        let coloring = ''
        switch (type){
            case 'fire':
                coloring = 'bg-[#f04816]'
                break;

            case 'bug':
                coloring = 'bg-[#3f8a3b]'
                break;

            case 'poison':
                coloring = 'bg-[#a946fa]'
                break;

            case 'psychic':
                coloring = 'bg-[#fa57b9]'
                break;
            
            case 'dark':
                coloring = 'bg-[#383838]'
                break;

            case 'water':
                coloring = 'bg-[#2e77ff]'
                break;

            case 'grass':
                coloring = 'bg-[#30ba45]'
                break;

            case 'dragon':
                coloring = 'bg-[#426bff]'
                break;

            case 'electric':
                coloring = 'bg-[#f2c246]'
                break;

            case 'fairy':
                coloring = 'bg-[#ff87f3]'
                break;

            case 'fighting':
                coloring = 'bg-[#ba5f3c]'
                break;

            case 'flying':
                coloring = 'bg-[#37506b]'
                break;
            
            case 'ghost':
                coloring = 'bg-[#655080]'
                break;

            case 'ground':
                coloring = 'bg-[#c7985b]'
                break;

            case 'ice':
                coloring = 'bg-[#83fafc]'
                break;

            case 'normal':
                coloring = 'bg-[#c7d0d6]'
                break;

            case 'steel':
                coloring = 'bg-[#86949e]'
                break;

            case 'rock':
                coloring = 'bg-[#947d5f]'
                break;
            }
        return coloring
    }

    if(isOpenModal)
    return(
        <>
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-700/40 w-screen h-screen">
            
            <div className="bg-red-400 w-[80%] h-[80%] fixed top-[10%] left-[10%] rounded-lg">
                    <div onClick={closeModal} className="w-full h-fit relative">
                        <IoMdClose className="absolute right-3 top-2 hover:cursor-pointer w-6 h-fit"/>
                    </div>

                <section className="grid grid-cols-2 h-full w-full mt-2">

                    <div id="poke-image" className="grid justify-items-center">

                        <div className="h-[80%] grid place-content-center justify-center gap-6 self-center">
                            <img src={imgPrincipal} className="w-fit h-60 p-5 border-2 rounded-md"/>
                            <h1 className="font-semibold text-lg capitalize">{pokeName}</h1>
                        </div>

                        <div className="flex w-full h-[60%]">
                            {
                                evolution.length > 0?
                                evolution.map((item, index) => {
                                    return (
                                        <div className={`w-[50%] h-full grid ${evolution.length - 1 === index ? '':'border-r-2'} content-center`} key={index}>
                                            <label className="capitalize font-semibold tracking-wide">{item.name}</label>
                                            <img src={item.img} alt="" className="w-[60%] h-fit place-self-center"/>
                                        </div>
                                        )
                                }):
                                (<></>)
                            }
                        </div>

                    </div>

                    <div id="poke-image" className="grid p-10 gap-4">

                        <div className="border-2">
                            Tamanho: {info.height/10} M
                            Peso: {info.weight/10} Kg

                            {console.log(info.status_base)}
                            {info.type != undefined? (<div className="capitalize grid w-fit border-2">
                                                        <h2 className="font-semibold">Tipo</h2> 
                                                        <div className="flex gap-5">
                                                            {
                                                                info.type.map((item, i) => {
                                                                    return (
                                                                            <p key={i} className={`${coloring_types(item.type.name)} px-4 py-[0.31rem] rounded-md outline outline-2 outline-offset-[-5px] outline-white -skew-x-6 font-medium`}>
                                                                                {item.type.name}
                                                                            </p>
                                                                        )
                                                                })
                                                            }
                                                        </div>
                                                    </div>):(null)}
                            
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
