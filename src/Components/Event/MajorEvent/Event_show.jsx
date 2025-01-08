import style from "./Event_show.module.css"


export default function Event_show({title}){

    return(
        <>
         <div className={style.pdf_container}>
                <h1>{title}</h1>

                <div className={style.card_size}>
                <iframe src="/assets/HIRTHICK GOWTHAM 1.pdf" width="100%" height="1120px" title="PDF Viewer"></iframe>
                </div>

            </div>
        </>
    )
}