import "./Home.css"
import React, { useEffect ,useState} from 'react';
import { useRef } from 'react';
import CountUp from 'react-countup';
import Slider from 'react-slick';

export const Home = () =>{
    const [isstat,setisstat] = useState(false)
    window.addEventListener("scroll",()=>{
      let x = window.scrollY
      console.log(x)
      if (x>1167){
        setisstat(true)           
      }else{
        setisstat(false)
      }
    })
    const staffData = [
      { id: 1, name: 'John Doe', role: 'Manager', image: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Jane Smith', role: 'Developer', image: 'https://via.placeholder.com/150' },
      { id: 3, name: 'Emily Johnson', role: 'Designer', image: 'https://via.placeholder.com/150' },
      { id: 4, name: 'Michael Brown', role: 'Marketing', image: 'https://via.placeholder.com/150' },
      { id: 5, name: 'Sara Davis', role: 'HR', image: 'https://via.placeholder.com/150' },
      { id: 6, name: 'David Wilson', role: 'Engineer', image: 'https://via.placeholder.com/150' },
    ];
  
    const sliderRef = useRef(null);
  
    const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true, // Auto-slide
      autoplaySpeed: 3000, // 3 seconds
      responsive: [
        {
          breakpoint: 768, // For small screens
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 1024, // For medium screens
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    };
  
  

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
            <div className="main-content-con shadow-lg">
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

        <div className="about-container-vm ">
            <div className="main-content-con-vm shadow-lg">
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

        <div className="stats-container">
          
            <div className="stat-item">
              <h3>Graudation</h3>
              {isstat &&(
              <p><CountUp start={0} end={100} duration={2}/>%</p>
              )}
            </div>
            <div className="stat-item">
              <h3>Placement</h3>
              {isstat &&(
              <p><CountUp start={0} end={94.7} duration={2}/>+</p>
            )}
            </div>
            <div className="stat-item">
              <h3>Certification</h3>
              {isstat &&(
              <p><CountUp start={0} end={90} duration={2}/>+</p>
            )}
            </div>
            <div className="stat-item">
              <h3>LPA</h3>
              {isstat &&(
              <p><CountUp start={0} end={7} duration={2}/>LPA</p>
            )}
            </div>
            
            <div className="stat-item">
              <h3>Internship</h3>
              {isstat &&(
                <p><CountUp start={0} end={80} duration={2}/>+</p>
              )}
            </div>
        </div>

        <div className="about-container-welcome">
            <div className="main-content-con-welcome shadow-lg">
          <div className="heading-name">
            <h2>Welcome Message</h2>
            <div className="name">
              <div className="hod_image"></div>
              <div className="detial">
                <h3>Dr. N. PALANIVEL,</h3>
                <p>Professor and Head, Department of loT and Cyber security <br></br>
                  including Block chain Technology</p>
              </div>
            </div>
          </div>
          <div className="main-content">
            <p>The Department of CSE(ICB) has been continuously making progress in Teaching and R&D Activities. The Department was started with an intake of 60 students in 2020. The Department is boasts a dedicated department library stocked with the newest Titles, Editions, Journals and Magazines all connected to the internet. To enhance the Technical skills of students and prepare them for Global competition, the Department organizes Seminars, Workshops, and Guest lectures.
            The fields of Internet of Things (IoT), Cyber Security, and Blockchain represent dynamic and rapidly evolving areas in technology, offering significant career growth opportunities. IoT refers to the interconnected network of devices that communicate and exchange data, driving innovations in smart homes, healthcare, and industrial automation. Cyber Security is critical in protecting these interconnected systems from threats and ensuring data integrity, privacy, and compliance. Blockchain technology, known for its secure and transparent ledger system, is transforming industries such as finance, supply chain, and healthcare by providing decentralized and tamper-proof transactions.
            Careers in these fields are in high demand, with roles such as IoT architects, Cyber security analysts, and Blockchain developers offering lucrative and fulfilling paths. Professionals in these domains not only contribute to technological advancements but also play a vital role in safeguarding digital ecosystems making them essential in today’s interconnected world. The future for IoT, Cyber Security, and Blockchain departments is bright, with ample opportunities for innovation, application, and professional growth as these technologies continue to evolve and integrate into the fabric of modern society.</p>
          </div>
        </div>
        </div>
        
        <div className="about-container-syllabus">  
          <div className="main-content-con-syllabus shadow-lg">
                <h2>CURRICULAM</h2>
                <div className="main-content">
                  <div className="Core-Competencies shadow-lg">
                    <h2>Core Competencies</h2>
                    <ul>
                      <li>Internet of things</li>
                      <li>Cloud computing</li>
                      <li>Information Security</li>
                      <li>Block Chain Technology</li>
                    </ul>
                  </div>
                  <div className="Syllabi shadow-lg">
                    <h2>Curriculum and Syllabi</h2>
                    <div className="syllabus-buttons ">
                      <div className="button-syllabi">UG CURRICULUM AND SYLLABI 2020-2021</div>
                      <div className="button-syllabi">UG CURRICULUM AND SYLLABI 2023-2024</div>
                    </div>
                  </div>
                </div>
          </div>
        </div>


<div className="w-100 py-3 faculty-main-conn" style={{ overflow: 'hidden', position: 'relative'}}>
      <h2 className="text-center mb-4 py-2">Faculty Members</h2>
      <div style={{ position: 'relative' }} >
        {/* Custom Left and Right Buttons */}
        <button
          className="btn btn-primary"
          style={{
            position: 'absolute',
            top: '39%', // Center vertically
            left: '10px', // Distance from the left edge
            zIndex: 10,
            transform: 'translateY(-50%)', // Adjust for true vertical centering
          }}
          onClick={() => sliderRef.current.slickPrev()}
        >
          &lt;
        </button>
        <button
          className="btn btn-primary"
          style={{
            position: 'absolute',
            top: '39%', // Center vertically
            right: '10px', // Distance from the right edge
            zIndex: 10,
            transform: 'translateY(-50%)', // Adjust for true vertical centering
          }}
          onClick={() => sliderRef.current.slickNext()}
        >
          &gt;
        </button>

        {/* Slick Slider */}
        <Slider ref={sliderRef} {...sliderSettings}>
          {staffData.map((staff) => (
            <div key={staff.id} className="faculty-conn">
              <img
                src={staff.image}
                className="rounded-circle faculty-img"
                alt={staff.name}
              />
              <h5 className="mt-3 text-center">{staff.name}</h5>
              <p className="mt-3 text-center">{staff.role}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
        
      <div className="about-container-contact">
        <div className="main-content-con-contact shadow-lg">
          <h2>Contact</h2>
          <p>If you have any inquiries regarding the department, please feel free to reach out to us.<br></br> We are here to assist you with any questions or information you may need.
<br></br>Dr. N. PALANIVEL, Professor & Head,
Department of CSE(Internet of Things and Cyber security including Block chain technology)</p>
        </div>
      </div>


        </>
    )
}