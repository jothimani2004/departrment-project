import { useState } from "react"
import style from "./Seperate_student.module.css"
import { Spinner } from 'react-bootstrap';



export default function Seperate_student({title}){

    const [imageSrc,setImageSrc] = useState(null);
    
    return (
        <>
         <div className={style.con}>

                 <h1>{title}</h1>
            <div className={style.content}>
                 
                <h2>Summary</h2>
                 <div className={style.para}>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta asperiores ipsum dolorem, reprehenderit quisquam placeat illo neque esse iure harum, quod fuga fugiat quibusdam. Officiis hic eius inventore perferendis quis!
                    Dolor earum adipisci placeat, deserunt aperiam corporis saepe nisi tempora ea sequi debitis consequatur? Eaque aut deserunt non aperiam perferendis fuga et aliquam tempora, eos nihil cumque cupiditate, illum itaque!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, molestias architecto! Sed delectus quibusdam et? Culpa veniam dolorem asperiores, voluptatum error eligendi, fuga sunt tempora ipsa, voluptate numquam omnis provident.
                    </p>
                    <div className={style.image_cover}>

                        <div className={style.image}>
                            <div className={style.image_size}>
                                {imageSrc ? (
                                    <img src={imageSrc} alt="Fetched Image" />
                                ) : (
                                    <Spinner/>
                                )}
                            </div>

                        </div>
                    </div>
                 </div>

                 <div className={style.option}>
                    <li><img src="/images/student_seperate_page/linked_in.png" alt="linkedin" height='10px' /> Linked in</li>
                    <li><img src="/images/student_seperate_page/github.png" alt="github" height='10px' /> Github</li>
                    <li><img src="/images/student_seperate_page/mail.png" alt="mail" height='10px' /> Gmail</li>
                    <li><img src="/images/student_seperate_page/leetcode.png" alt="leet code    " height='10px' />Leet code</li>
                 </div>
            </div>

            <div className={style.line}></div>
            
            <div className={style.pdf_container}>
                <h1>Resume</h1>

                <div className={style.card_size}>
                <iframe src="/assets/HIRTHICK GOWTHAM 1.pdf" width="100%" height="1120px" title="PDF Viewer"></iframe>
                </div>

            </div>


        </div>

        </>
    )
}