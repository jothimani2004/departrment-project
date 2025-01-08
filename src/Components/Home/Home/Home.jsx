import "./Home.css"
export const Home = () =>{
    return (
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
    )
}