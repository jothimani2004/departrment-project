import React, { useContext, useState, useEffect, useRef } from 'react';
import { DomainContext } from './DomainContext';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Domain_names = ({ items, isResource }) => {
  const { domain } = useParams();
  const { domainDetails } = useContext(DomainContext);
  const [isOpen, setIsOpen] = useState(false); // State to toggle the menu
  const menuRef = useRef(null); // Ref to detect outside clicks

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle outside click to close the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // Close the menu if clicked outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Hamburger icon for small screens */}
      <div className="d-md-none d-flex justify-content-end p-3">
        <button onClick={toggleMenu} className="btn">
          {isOpen ? (
            <AiOutlineClose size={30} className="text-dark" />
          ) : (
            <AiOutlineMenu size={30} className="text-dark" />
          )}
        </button>
      </div>

      {/* Menu for small screens with animation */}
      <motion.div
        ref={menuRef} // Attach ref to detect outside clicks
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-10 bg-light p-4 mt-5 d-md-none`}
      >
        <ul className="list-unstyled">
          {items.map((item) => {
            const linkPath = isResource ? `/${domain}/${item}` : `/${item}`;

            return (
              <li key={item}>
                <Link
                  to={linkPath}
                  onClick={toggleMenu} // Close menu when an item is clicked
                  className="d-block p-2 text-dark bg-light rounded hover:bg-secondary hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.div>

      {/* Menu for larger screens */}
      <div className="d-none d-md-block">
        <ul className="p-4 list-unstyled">
          {items.map((item) => {
            const linkPath = isResource ? `/${domain}/${item}` : `/${item}`;

            return (
              <li key={item}>
                <Link
                  to={linkPath}
                  className="d-block p-2 text-dark bg-light rounded hover:bg-secondary hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Domain_names;
