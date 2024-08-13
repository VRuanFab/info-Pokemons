
import api from "../../api/api"
import { useState, useEffect } from "react"

export default function Info({isOpenModal, closeModal, imgPrincipal, pokeName}){

    const [info, setInfo] = useState([])
    
    useEffect(() => {
        const pokemonInfo = async () => {
            await api.get(`/pokemon/${pokeName}`)
            .then(res => {
                setInfo(res.data)
            })
            .catch(err => console.log(err))
        }

        // const pokemonInfo = async () => {
        //     const infoPromise = Array.from(api.get(`/pokemon/$pokeName`))

        //     const result = 
        // }
        pokemonInfo()
    }, [isOpenModal])

    console.log(info)

    if(isOpenModal)
    return(
        <>
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-700/40 w-screen h-screen">
            
            <div className="bg-slate-300 w-[80%] h-[80%] fixed top-[10%] left-[10%] rounded-lg">
                    <div onClick={closeModal} className="border-2 border-black w-full h-fit">X</div>

                <section className="grid grid-cols-2 h-full w-full">

                    <div id="poke-image" className="bg-red-400/90 grid place-items-center">

                        <div className="w-[60%] h-[70%] border-2 rounded-md">
                            <img src={imgPrincipal} className="w-fit h-full p-10"/>
                            <h1 className="font-semibold text-lg capitalize">{pokeName}</h1>
                        </div>

                        <div className="flex w-full h-[50%]">
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
