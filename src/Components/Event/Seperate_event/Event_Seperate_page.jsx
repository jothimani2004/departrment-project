import style from "./Event_Seperate_page.module.css"


export default function Event_Seperate_page({title}){


    return(
        <>
        <div className={style.main_cover}>
            <div className={style.pdf_container}>
                <h1>{title}</h1>

                <div className={style.card_size}>
                <img src="/images/event_page/elan.jpeg" width="100%" height="600px" />
                </div>

            </div>

            <div className={style.content}>
                <h1>Detail</h1>
                <div className={style.para}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, facere. Labore fugit voluptatibus odit perspiciatis explicabo omnis? Neque, tempora incidunt praesentium nesciunt corrupti blanditiis id totam. Provident dicta quos modi!
                    Magni, facilis nulla harum tempora reiciendis ipsum assumenda ipsam, est perferendis iure adipisci a dicta hic deleniti fugit animi possimus iusto nam eaque odio. Voluptates animi suscipit officia impedit eos!
                    Quasi error tenetur, repudiandae illum animi iure quam ipsa accusamus officia cumque dolorum praesentium consectetur odio fugit tempora voluptatum veritatis impedit placeat officiis quos adipisci doloribus porro! Vel, atque enim.</p>

                </div>

            </div>


            
        </div>
        </>
    )
}