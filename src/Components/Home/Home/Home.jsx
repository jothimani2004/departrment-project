import "./Home.css"
import React, { useEffect } from 'react';

export const Home = () =>{
  useEffect(() => {
    // Initialize PureCounter after the component mounts
    const purecounterScript = document.createElement("script");
    purecounterScript.src = "/assets/purecounter_vanilla.js";
    purecounterScript.async = true;
    document.body.appendChild(purecounterScript);

    return () => {
      document.body.removeChild(purecounterScript); // Clean up
    };
  }, []);

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

        <div className="about-container-vm">
            <div className="main-content-con-vm">
                <div className="text-con">
                    <h2>Department Vision and Mission</h2>
                    <div className="vm-con">
                        <h4>Vision</h4>
                        <ul>
                            <li className="font-styling">Nurturing future Innovators, Entrepreneurs, and Researchers committed to pioneering Technological solutions and making a meaningful difference in the world
                            </li>
                        </ul>
                    </div>
                    <div className="vm-con">
                    <h4>Mission</h4>
                    <ul className="points">
                        <li className="font-styling">To develop critical thinking and problem-solving skills in students, so that they are empowered to take on and deal with the complex problems
                        </li>
                        <li className="font-styling">To motivate and help students convert their innovative idea into an entrepreneurial venture in their domains
                        </li>
                        <li className="font-styling">Enhance the Research skills and knowledge of students and professionals through cutting-edge research.
                        </li >
                        <li className="font-styling">Enlighten young minds to educate society on safeguarding human safety and security nationwide in the digital world.</li>
                    </ul>
                    </div>
                </div>
                </div>

        </div>

        <div id="stats" className="stats section">

<div className="container" data-aos="fade-up" data-aos-delay="100">

  <div className="row gy-4">

    <div className="col-lg-3 col-md-6">
      <div className="stats-item text-center w-100 h-100">
        <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" className="purecounter"></span>
        <p>Clients</p>
      </div>
    </div>

    <div className="col-lg-3 col-md-6">
      <div className="stats-item text-center w-100 h-100">
        <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" className="purecounter"></span>
        <p>Projects</p>
      </div>
    </div>

    <div className="col-lg-3 col-md-6">
      <div className="stats-item text-center w-100 h-100">
        <span data-purecounter-start="0" data-purecounter-end="1453" data-purecounter-duration="1" className="purecounter"></span>
        <p>Hours Of Support</p>
      </div>
    </div>

    <div className="col-lg-3 col-md-6">
      <div className="stats-item text-center w-100 h-100">
        <span data-purecounter-start="0" data-purecounter-end="32" data-purecounter-duration="1" className="purecounter"></span>
        <p>Workers</p>
      </div>
    </div>

  </div>

</div>

</div>



        </>
    )
}