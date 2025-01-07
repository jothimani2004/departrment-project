import React, { useState, useEffect } from 'react';
import './Navbar.css'


export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    useEffect(() => {
      const handleResize = () => {
          // If the screen width is greater than 768px, close the menu
          if (window.innerWidth > 768) {
              setIsMenuOpen(false);
          }
      };

      // Attach the event listener on mount
      window.addEventListener('resize', handleResize);

      // Cleanup the event listener on unmount
      return () => {
          window.removeEventListener('resize', handleResize);
      };
    }, []);
    return (
      <nav>
        <div className="container-navbar">
          <div className="main-navbar">
              <a href="#" className="logoname">Depratment of ICB</a>

              <div className="hamburger" onClick={toggleMenu}>
                <img src='/images/menu1.png' className={!isMenuOpen ? 'burger-logo' : 'burger-logo-active'} alt="" />
              </div>

              <ul className={`nav-ul ${isMenuOpen ? 'nav-active' : 'nav-deactive'}`}>
                <li><a href="#">HOME</a></li>
                <li><a href="#">ABOUT US</a></li>
                <li><a href="#">ACADEMICS</a></li>
                <li><a href="#">PEOPLE</a></li>
                <li><a href="#">RESOURCE</a></li>
                <li><a href="#">PUBLICATION</a></li>
                <li><a href="#">EVENTS</a></li>
                <li><a href="#">CONTACT US</a></li>
              </ul>

          </div>
        </div>
      </nav>
    )
}