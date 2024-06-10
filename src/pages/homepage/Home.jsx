import api from "../../api/api"
import Info from "./Info_part"

// const test = api.get('pokemon/charizard')
// .then((res)  =>  {
//     console.log(res.data)
// })

export default function Homepage(){
    return (
        <>
        <div className="w-screen h-screen grid justify-center content-center">
            <div className="flex">
                <div id="poke-image" className="w-[25rem] h-[30rem] bg-red-800 rounded-l-2xl rounded-r-md pl-[2 px] relative">
                    <div className="absolute right-9 top-4 w-[80%] h-[90%] bg-red-400">

                    </div>
                </div>

                {/* <Info/> */}
            </div>
        </div>
        </>
    )
}