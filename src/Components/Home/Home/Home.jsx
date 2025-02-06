import "./Home.css"
import React, { useEffect ,useState} from 'react';
import { useRef } from 'react';
import CountUp from 'react-countup';
import Slider from 'react-slick';
import About_us from "../../About_us/About_us";

export const Home = () =>{
    const [isstat,setisstat] = useState(false)
    window.addEventListener("scroll",()=>{
      let x = window.scrollY
      console.log(x)
      if (x>1767){
        setisstat(true)           
      }else{
        setisstat(false)
      }
    })
    const staffData = [
      { id: 1, name: 'Dr. N. Palanivel', role: 'Professor & HOD	', image: '/images/faculity_photo/Palani.jpg' },
      { id: 2, name: 'Mr.U.Muruganantham', role: 'Assistant Professor', image: '/images/faculity_photo/muruganantham.jpg' },
      { id: 3, name: 'Kumaraguru', role: 'Assistant Professor', image: '/images/faculity_photo/kumaraguru.jpeg' },
      { id: 4, name: 'Mrs.K.C Nithyasree', role: 'Assistant Professor', image: '/images/faculity_photo/Nithasri.jpg.jpeg' },
      { id: 5, name: 'Mrs.K.Kavitha', role: 'Assistant Professor', image: '/images/faculity_photo/Kavitha.jpg' },
      { id: 6, name: 'Ms..A.Sheerin', role: 'Assistant Professor', image: '/images/faculity_photo/sheerin.jpeg' },
      { id: 6, name: 'Ms. S.Adolphine Shyni', role: 'Assistant Professor', image: '/images/faculity_photo/Shyni.jpeg' },

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
          <div className="carousel-image-container">
            <img src="/images/firstpage_img/1000147493 (1).jpg" className="d-block w-100 carousel-image" alt="First Event"/>
            <div className="carousel-caption">First Event - A Special Moment</div>
          </div>
        </div>

        <div className="carousel-item">
          <div className="carousel-image-container">
            <img src="/images/firstpage_img/2nd_year_projectexpo.jpeg" className="d-block w-100 carousel-image" alt="Project Expo"/>
            <div className="carousel-caption">Congratulations Mr. Bharathi, Mr. Vishnu, and Mr. Dhineshkumar, Second year CSE (ICB) students, WON Second place in the Project Expo held at SRM University, Chennai.</div>
          </div>
        </div>

        <div className="carousel-item">
          <div className="carousel-image-container">
            <img src="/images/firstpage_img/IMG20240302175103 (1).jpg" className="d-block w-100 carousel-image" alt="Tech Event"/>
            <div className="carousel-caption">Tech Event - Innovation in Action</div>
          </div>
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
       
      {/* About department */}
        <About_us/>


      {/* Vision and Mission for the department */}

        <div className="about-container-vm p_b">
            <div className="main-content-con-vm shadow-lg s_b t_c rounded-3">
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

          

        <div className="stats-container b_g_s t_c">
          
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

        <div className="about-container-welcome shadow">
            <div className="main-content-con-welcome shadow-lg  s_b t_c rounded-3">
          <div className="heading-name">
            <h2 className="text-center my-5">Welcome Message</h2>
            <div className="name">
            <div
                className="hod_image m-3"
                style={{
                 backgroundImage: `url('/images/faculity_photo/Palani.jpg')`, // Corrected syntax
                 backgroundSize: 'cover', // Ensure the image covers the div
                 backgroundPosition: 'center', // Center the image
                 width: '100px', // Set width (adjust as needed)
                 height: '100px' // Set height (adjust as needed)
  }}
>
</div>

              <div className="detial">
                <h3>Dr. N. PALANIVEL,</h3>
                <p>Professor and Head, Department of loT and Cyber security <br></br>
                  including Block chain Technology</p>
              </div>
            </div>
          </div>
          <div class="w-100 border border-dark"></div>


          <div className="main-content">
            <p>The Department of CSE(ICB) has been continuously making progress in Teaching and R&D Activities. The Department was started with an intake of 60 students in 2020. The Department is boasts a dedicated department library stocked with the newest Titles, Editions, Journals and Magazines all connected to the internet. To enhance the Technical skills of students and prepare them for Global competition, the Department organizes Seminars, Workshops, and Guest lectures.
            The fields of Internet of Things (IoT), Cyber Security, and Blockchain represent dynamic and rapidly evolving areas in technology, offering significant career growth opportunities. IoT refers to the interconnected network of devices that communicate and exchange data, driving innovations in smart homes, healthcare, and industrial automation. Cyber Security is critical in protecting these interconnected systems from threats and ensuring data integrity, privacy, and compliance. Blockchain technology, known for its secure and transparent ledger system, is transforming industries such as finance, supply chain, and healthcare by providing decentralized and tamper-proof transactions.
            Careers in these fields are in high demand, with roles such as IoT architects, Cyber security analysts, and Blockchain developers offering lucrative and fulfilling paths. Professionals in these domains not only contribute to technological advancements but also play a vital role in safeguarding digital ecosystems making them essential in today’s interconnected world. The future for IoT, Cyber Security, and Blockchain departments is bright, with ample opportunities for innovation, application, and professional growth as these technologies continue to evolve and integrate into the fabric of modern society.</p>
          </div>
        </div>
        </div>
        
        <div className="about-container-syllabus shadow">  
          <div className="main-content-con-syllabus shadow-lg  s_b t_c rounded-3">
                <h2>CURRICULAM</h2>
                <div className="main-content">
                  <div className="Core-Competencies shadow-lg s2_b rounded-4">
                    <h2>Core Competencies</h2>
                    <ul>
                      <li>Internet of things</li>
                      <li>Cloud computing</li>
                      <li>Information Security</li>
                      <li>Block Chain Technology</li>
                    </ul>
                  </div>
                  <div className="Syllabi shadow-lg s2_b rounded-4">
                    <h2>Curriculum and Syllabi</h2>
                    <div className="syllabus-buttons ">
                      <div className="button-syllabi s_b t_c">UG CURRICULUM AND SYLLABI 2020-2021</div>
                      <div className="button-syllabi s_b t_c">UG CURRICULUM AND SYLLABI 2023-2024</div>
                    </div>
                  </div>
                </div>
          </div>
        </div>


<div className="w-100 py-3 faculty-main-conn " style={{ overflow: 'hidden', position: 'relative'}}>
      <h2 className="text-center mb-4 py-2 col">Faculty Members</h2>
      <div style={{ position: 'relative' }} >
        {/* Custom Left and Right Buttons */}
        <button
          className="btn btn-primary rounded-1 "
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
          className="btn btn-primary rounded-1 "
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
            <div 
            key={staff.id} 
            className="faculty-conn d-flex flex-column align-items-center"
          >
            <img
              src={staff.image}
              className="img-fluid rounded-circle"
              alt={staff.name}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                border: "3px solid #f0f0f0",
              }}
            />
            <h5 className="mt-3 text-center">{staff.name}</h5>
            <p className="mt-3 text-center">{staff.role}</p>
          </div>
          
          ))}
        </Slider>
      </div>
    </div>
        
      <div className="about-container-contact ">
        <div className="main-content-con-contact shadow-lg s_b rounded-3 t_c">
          <h2>Contact</h2>
          <p>If you have any inquiries regarding the department, please feel free to reach out to us.<br></br> We are here to assist you with any questions or information you may need.
<br></br>Dr. N. PALANIVEL, Professor & Head,
Department of CSE(Internet of Things and Cyber security including Block chain technology)</p>
        </div>
      </div>


        </>
    )
}