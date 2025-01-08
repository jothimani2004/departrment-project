import "bootstrap/dist/css/bootstrap.min.css";
import style from "./calender.module.css"



export default function Calander_show({keys:{pfd_path,title}}){

  
    return (
        <>
        <div className={style.con}>
            <div className={style.content}>
                 <h1>{title}</h1>
                 <div className={style.para}>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta asperiores ipsum dolorem, reprehenderit quisquam placeat illo neque esse iure harum, quod fuga fugiat quibusdam. Officiis hic eius inventore perferendis quis!
                    Dolor earum adipisci placeat, deserunt aperiam corporis saepe nisi tempora ea sequi debitis consequatur? Eaque aut deserunt non aperiam perferendis fuga et aliquam tempora, eos nihil cumque cupiditate, illum itaque!
                    </p>
                 </div>
            </div>

            <div className={style.pdf_container}>

                <div className={style.card_size}>
                <iframe src={pfd_path} width="100%" height="600px" title="PDF Viewer"></iframe>
                </div>

            </div>
        </div>
        </>
    )
} 