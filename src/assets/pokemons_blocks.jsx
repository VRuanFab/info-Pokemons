
export default function Pokemon_blocks(props){
    

    return (
        <>
        <div className="grid text-center w-fit">
            <img src={props.img_pokemon} alt="pokeImage" id="pokemon_img"/>
            <label htmlFor="pokemon_img">{props.nome_pokemon}</label>
        </div> 
        </>
    )
}