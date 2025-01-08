import { useState } from "react"
import style from "./Seperate_student.module.css"


export default function Seperate_student({title}){

    const [imageSrc,setImageSrc] = useState(null);
    
    return (
        <>
         <div className={style.con}>

            <div className={style.content}>
                 <h1>{title}</h1>
                 
                 <div className={style.para}>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta asperiores ipsum dolorem, reprehenderit quisquam placeat illo neque esse iure harum, quod fuga fugiat quibusdam. Officiis hic eius inventore perferendis quis!
                    Dolor earum adipisci placeat, deserunt aperiam corporis saepe nisi tempora ea sequi debitis consequatur? Eaque aut deserunt non aperiam perferendis fuga et aliquam tempora, eos nihil cumque cupiditate, illum itaque!
                    </p>
                    <div className={style.image_cover}>

                        <div className={style.image}>
                            <div className={style.image_size}>
                                {imageSrc ? (
                                    <img src={imageSrc} alt="Fetched Image" />
                                ) : (
                                    <p>Loading image...</p>
                                )}
                            </div>

                        </div>
                    </div>
                 </div>
            </div>

        </div>

        </>
    )
}