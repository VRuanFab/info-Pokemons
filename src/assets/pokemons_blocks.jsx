/* eslint-disable react/prop-types */

export default function Pokemon_blocks(props){
    

    return (
        <>
            <img src={props.img_pokemon} alt="pokeImage" id="pokemon_img" className="w-[6.4rem]"/>
            <span className="font-semibold text-[17px] tracking-wide capitalize"> {props.nome_pokemon} </span>
        </>
    )
}