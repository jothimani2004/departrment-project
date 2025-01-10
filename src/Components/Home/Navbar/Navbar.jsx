import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-xl navbar-light sticky-top">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand text-dark" href="#">Department of ICB</a>

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
            {/* Dropdown for HOME */}
            <li className="nav-item mx-3">
              <a
                className="nav-link text-dark "
                href="/"
              >
                HOME
              </a>
            </li>

            {/* Dropdown for ABOUT US */}
            <li className="nav-item dropdown">
              <a className="nav-link text-dark" href="/About_us">
                ABOUT US
              </a>
            </li>

            {/* Dropdown for ACADEMICS */}
            <li className="nav-item dropdown mx-3">
              <a
                className="nav-link text-dark dropdown-toggle"
                href="/"
                id="academicsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ACADEMICS
              </a>
              <ul className="dropdown-menu" aria-labelledby="academicsDropdown">
                <li><a className="dropdown-item" href="/Academic/calander">Calender</a></li>
                <li><a className="dropdown-item" href="/Academic/courses">Courses</a></li>
                <li><a className="dropdown-item" href="/Academic/Time_table">Time Table</a></li>
                <li><a className="dropdown-item" href="#">Student Data Verification</a></li>
              </ul>
            </li>

            {/* Dropdown for PEOPLE */}
            <li className="nav-item dropdown mx-3">
              <a
                className="nav-link text-dark dropdown-toggle"
                href="/"
                id="peopleDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                PEOPLE
              </a>
              <ul className="dropdown-menu" aria-labelledby="peopleDropdown">
                <li><a className="dropdown-item" href="/People/Students">Students</a></li>
                <li><a className="dropdown-item" href="/People/Faculty">Faculty</a></li>
                <li><a className="dropdown-item" href="/People/Alumni">Alumni</a></li>
              </ul>
            </li>

            {/* Dropdown for RESOURCE */}
            <li className="nav-item dropdown mx-3">
              <a className="nav-link text-dark" href="https://www.zenotion.college/">
                RESOURCE
              </a>
            </li>

            {/* Dropdown for PUBLICATION */}
            <li className="nav-item dropdown mx-3">
              <a
                className="nav-link text-dark dropdown-toggle"
                href="#"
                id="publicationDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                PUBLICATION
              </a>
              <ul className="dropdown-menu" aria-labelledby="publicationDropdown">
                <li><a className="dropdown-item" href="/Publications/journals">Journal</a></li>
                <li><a className="dropdown-item" href="/Publications/conferences">Paper</a></li>
                <li><a className="dropdown-item" href="/Publications/patents">Patent</a></li>
              </ul>
            </li>

            {/* Dropdown for EVENTS */}
            <li className="nav-item dropdown mx-3">
              <a
                className="nav-link text-dark dropdown-toggle"
                href="#"
                id="eventsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                EVENTS
              </a>
              <ul className="dropdown-menu" aria-labelledby="eventsDropdown">
                <li><a className="dropdown-item" href="/Event/Major_events">Major Events</a></li>
                <li><a className="dropdown-item" href="/Event/Cocurrcular_events">CoCurricular events</a></li>
                <li><a className="dropdown-item" href="/Event/Extra_Curricular_events">Extra Curricular Events</a></li>
              </ul>
            </li>

            {/* Dropdown for CONTACT US */}
            <li className="nav-item dropdown mx-3">
              <a className="nav-link text-dark" href="#Contact">
                CONTACT US
              </a>
            </li>

            <li className="nav-item mx-3 sign-up">
                <a className="nav-link btn btn-lg custom-login-btn" href="/login">
              Login/SignUp
            </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
