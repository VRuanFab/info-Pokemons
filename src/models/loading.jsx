import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading(){
    return(
        <div className="w-full h-full grid content-center items-center fixed top-0 left-0 z-30 justify-center">
            <AiOutlineLoading3Quarters className="w-[80%] h-fit"/>
            <p>Loading...</p>
            {/* <img src={AiOutlineLoading3Quarters} alt="" /> */}
        </div>
    )
}