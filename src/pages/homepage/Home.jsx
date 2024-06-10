import api from "../../api/api"

const test = api.get('pokemon/squirtle')
.then((res)  =>  {
    console.log(res.data)
    let pokemon_image = document.createElement('img')
    pokemon_image.src = res.data.sprites.front_default
    document.getElementById('poke-image').appendChild(pokemon_image)
    let poke_shiny = document.createElement('img')
    poke_shiny.src = res.data.sprites.other.showdown.front_default
    document.getElementById('poke-image').appendChild(poke_shiny)
})

test
export default function Homepage(){
    return (
        <>
        <div className="w-screen h-screen grid justify-center">
                <div className="text-blue-500">
                    this is my mainpage
                </div>
                <div id="poke-image">

                </div>
        </div>
        </>
    )
}