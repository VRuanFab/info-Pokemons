/* eslint-disable react/prop-types */
import Info from "../pages/modal_info/infoModal"
import { useState, useEffect } from "react"


export default function Pokemon_blocks(props){
    const [openModal, setOpenModal] = useState()
    
    return (
        <>
            <div onClick={() => setOpenModal(true)} className="hover:cursor-pointer hover:bg-gray-500/30 rounded-lg p-3">
                <img src={props.img_pokemon} alt="pokeImage" id="pokemon_img" className="w-[6.4rem]"/>
                <span className="font-semibold text-[17px] tracking-wide capitalize"> {props.nome_pokemon} </span>

            </div>
            <Info isOpenModal={openModal} closeModal={() => {setOpenModal(!openModal)}} imgPrincipal={props.img_pokemon} pokeName={props.nome_pokemon}/>
        </>
    )
}