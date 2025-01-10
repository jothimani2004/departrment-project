import "bootstrap/dist/css/bootstrap.min.css";
import style from "./calender.module.css"



export default function Calander_show({keys:{pfd_path,title}}){

  
    return (
        <>
         <div className="container py-4 s_b rounded-2 my-4" >
            <div className="content mt-3 px-3">
                <h1 className="mb-3 t_c">{title}</h1>
                <div className="para ps-4">
                    <p className="fs-5">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta asperiores ipsum dolorem, reprehenderit quisquam placeat illo neque esse iure harum, quod fuga fugiat quibusdam. Officiis hic eius inventore perferendis quis!
                        Dolor earum adipisci placeat, deserunt aperiam corporis saepe nisi tempora ea sequi debitis consequatur? Eaque aut deserunt non aperiam perferendis fuga et aliquam tempora, eos nihil cumque cupiditate, illum itaque!
                    </p>
                </div>
            </div>

            <div className="pdf-container d-flex justify-content-center align-items-center py-3">
                <div className="card shadow-lg w-100 rounded-3" style={{ maxWidth: '90%' }}>
                    <iframe
                        src={pfd_path}
                        width="100%"
                        height="600px"
                        title="PDF Viewer"
                        className="rounded-3"
                    ></iframe>
                </div>
            </div>
        </div>
        </>
    )
} 