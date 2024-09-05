import { AiOutlineLoading3Quarters } from "react-icons/ai";
import greatball from "../assets/pokeballs/greatball.png"

export default function Loading(){
    return(
        <div className="w-full h-full grid content-center items-center absolute top-0 left-0 z-30 justify-center border-rounded-lg bg-[#b3b3b3]">
                {/* <AiOutlineLoading3Quarters className="w-[80%] h-fit"/> */}
                <img src={greatball} className="animate-wiggle"/>
            <p>Loading...</p>
            {/* <img src={AiOutlineLoading3Quarters} alt="" /> */}
        </div>
    )
}