  import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Navbar.css";
import { GlobalContext } from "../../GlobalContext/globalContext.jsx";
import Resize from "../../../Custom_hook/window_resize.jsx";
import { useLocation,useNavigate } from "react-router-dom";
import cookies from 'js-cookie'; 


export const Navbar = () => {
  const { checker } = useContext (GlobalContext);
  const [display, setDisplay] = useState(false);
  const {width} = Resize()
  const location = useLocation(); // Get current route
  const navigate=useNavigate();
  const back_api=process.env.REACT_APP_API_URL;

  const [open, setOpen] = useState(false);
  // Function to handle hover
  const handleMouseEnter = (event) => {
    event.currentTarget.classList.add("show");
    event.currentTarget.querySelector(".dropdown-menu").classList.add("show");
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.classList.remove("show");
    event.currentTarget.querySelector(".dropdown-menu").classList.remove("show");
  };


  useEffect(() => {
    const updateDisplay = async () => {
      const result = await checker(); // Ensure checker() updates correctly
      setDisplay(result);
    };
    if(location.pathname == "/login"){
      updateDisplay();
    }
  });

  useEffect(() => {
    const updateDisplay = async () => {
      const result = await checker(); // Ensure checker() updates correctly
      setDisplay(result);
    };

    updateDisplay();
    console.log("path of the page ",location.pathname);
  }, [location.pathname]);

  const logoutApicall = async () =>{
    cookies.remove("jwtToken");
   
   console.log("hello");
   navigate('/');
   window.location.reload();
    
  }


  return (
    <nav className="navbar navbar-expand-xxl navbar-light sticky-top ">
      <div className="container-fluid">
        <a className="navbar-brand text-dark" href="/">
          <img src={width > 500 ? "/MVIT-logo_full.png" : "/mit_logo.jpg"} alt="" height="75px" />
        </a>

        {/* Hamburger Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* HOME */}
            <li className="nav-item mx-3">
              <a className="nav-link text-dark fs-6" href="/">
                HOME
              </a>
            </li>

            {/* ABOUT US */}
            <li className="nav-item dropdown">
              <a className="nav-link text-dark fs-6" href="/About_us">
                ABOUT US
              </a>
            </li>

            {/* ACADEMICS (Hover Dropdown) */}
            <li
              className="nav-item dropdown mx-3"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
             
             <div className="nav-link text-dark dropdown-toggle fs-6">

                ACADEMICS
             </div>
              
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/Academic/calander">Calendar</a></li>
                <li><a className="dropdown-item" href="/Academic/courses">Courses</a></li>
                <li><a className="dropdown-item" href="/Academic/Time_table">Time Table</a></li>
                <li><a className="dropdown-item" href="/Academic/student-verification">Student Data Verification</a></li>
              </ul>
            </li>

               {/* ACADEMICS (Hover Dropdown) */}
               <li
              className="nav-item dropdown mx-3"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
             
             <div className="nav-link text-dark dropdown-toggle fs-6">

                RESOURCE
             </div>
              
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/resourse/CyberSecurity">Cyber Security</a></li>
                <li><a className="dropdown-item" href="/resourse/InternetOfThings">Internet Of Things</a></li>
                <li><a className="dropdown-item" href="/resourse/BlockchainTechnology">BlockChain Technology</a></li>
              </ul>
            </li>

            {/* PEOPLE (Hover Dropdown) */}
            <li
              className="nav-item dropdown mx-3"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
             <div className="nav-link text-dark dropdown-toggle fs-6">
                PEOPLE
              </div>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/People/Students">Students</a></li>
                <li><a className="dropdown-item" href="/People/Faculty">Faculty</a></li>
                <li><a className="dropdown-item" href="/People/Alumni">Alumni</a></li>
              </ul>
            </li>

            {/* PUBLICATION (Hover Dropdown) */}
            <li
              className="nav-item dropdown mx-3"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
             <div className="nav-link text-dark dropdown-toggle fs-6">

                PUBLICATION
             </div>
              
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/Publications/journals">Journal</a></li>
                <li><a className="dropdown-item" href="/Publications/conferences">Paper</a></li>
                <li><a className="dropdown-item" href="/Publications/patents">Patent</a></li>
              </ul>
            </li>

            {/* EVENTS (Hover Dropdown) */}
            <li
              className="nav-item dropdown mx-3"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="nav-link text-dark dropdown-toggle fs-6" >

                EVENTS
              </div>
              
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/Event/Major_events">Major Events</a></li>
                <li><a className="dropdown-item" href="/Event/Cocurrcular_events">CoCurricular Events</a></li>
                <li><a className="dropdown-item" href="/Event/Extra_Curricular_events">Extra Curricular Events</a></li>
              </ul>
            </li>

            {/* CONTACT US */}
            <li className="nav-item dropdown mx-3">
              <a className="nav-link text-dark fs-6" href="#Contact">
                CONTACT US
              </a>
            </li>

            {/* LOGIN BUTTON */}
            <li className="nav-item mx-3 sign-up">
                {(display === "Login") ? (
                  <a className="nav-link btn btn-lg custom-login-btn fs-6" href="/login">
                    {display}
                  </a> 
                ):(
                  

                  <li 
              className="nav-item dropdown mx-3 "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
          <i className="ri-user-fill account-login nav-link text-dark dropdown-toggle fs-6"></i>      
              
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href={display.role == "stud"?`/People/Students/Profile/Edit?register_no=${display.reg}`:"/Admin_page/Edit"}>profile</a></li>
                <li>
                  <a className="dropdown-item" onClick={logoutApicall}>
                    Logout
                  </a>
                </li>

              </ul>
            </li>
            // <div 
            //   className="profile-container dropdown"
            //   onMouseEnter={() => setOpen(true)}
            //   onMouseLeave={() => setOpen(false)}
            // >
            //   <i className="ri-user-fill account-login"></i>
            //   <ul className={`dropdown-menu ${open ? "show" : ""}`}>
            //     <li>
            //       <a className="dropdown-item" href="/profile">Profile</a>
            //     </li>
            //     <li>
            //       <a className="dropdown-item" href="/logout">Logout</a>
            //     </li>
            //   </ul>
            // </div>

                )}            
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
