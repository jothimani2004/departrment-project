import "./Home.css"
export const Home = () =>{
    return (
        <>
        <div id="carouselExampleAutoplaying" className="carousel slide custom-carousel" data-bs-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
            <img src="/images/1.jpg" className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
            <img src="/images/2.jpg" className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
            <img src="/images/3.jpg" className="d-block w-100" alt="..."/>
            </div>
        </div>
        <button className="carousel-control-prev custom-carousel" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next custom-carousel" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
        </div>

        <div className="about-container">
            <div className="main-content-con">
                <div className="top-con">
                <div className="text-con">
                    <h2>About the Department</h2>
                    <p>The Department of CSE(ICB) has been continuously making progress in Teaching and R&D Activities. The Department was started with an intake of 60 students in 2020. The Department is boasts a dedicated department library stocked with the newest Titles, Editions, Journals and Magazines all connected to the internet. To enhance the Technical skills of students and prepare them for Global competition, the Department organizes Seminars, Workshops, and Guest lectures. The fields of Internet of Things (IoT), Cyber Security, and Blockchain represent dynamic and rapidly evolving areas in technology, offering significant career growth opportunities. IoT refers to the interconnected network of devices that communicate and exchange data, driving innovations in smart homes, healthcare, and industrial automation. Cyber Security is critical in protecting these interconnected systems from threats and ensuring data integrity, privacy, and compliance. Blockchain technology, known for its secure and transparent ledger system, is transforming industries such as finance, supply chain, and healthcare by providing decentralized and tamper-proof transactions.</p>
                </div>
                <div className="img-con">
                <img src="/images/about_dept.png" alt="" className="dept-img"/>
                </div>
                </div>
                <div className="bottom-con">Careers in these fields are in high demand, with roles such as IoT architects, Cyber security analysts, and Blockchain developers offering lucrative and fulfilling paths. Professionals in these domains not only contribute to technological advancements but also play a vital role in safeguarding digital ecosystems making them essential in today’s interconnected world. The future for IoT, Cyber Security, and Blockchain departments is bright, with ample opportunities for innovation, application, and professional growth as these technologies continue to evolve and integrate into the fabric of modern society. Vision and Mission
                </div>
                
            </div>
        </div>


        </>
    )
}