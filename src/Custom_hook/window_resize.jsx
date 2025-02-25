import { useLayoutEffect, useState } from "react";






export default function Resize(){
    const [windowSize,setWindowSize] = useState({
        "width":window.innerWidth,
        "height":window.innerHeight
    })

    function handle(){
        setWindowSize({
            "width":window.innerWidth,
            "height":window.innerHeight
        })
    }

    useLayoutEffect(()=>{

        window.addEventListener("resize",handle)

    },[])


    return windowSize

}