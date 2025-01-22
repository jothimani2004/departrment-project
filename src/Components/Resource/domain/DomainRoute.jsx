import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence  } from 'framer-motion';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import Domain_details from './Domain_details';
import Notes from '../resourse/Notes';
import ResearchPapers from '../resourse/ResearchPapers';
import Links from '../resourse/Links';
import Videos from '../resourse/Videos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

const DomainRoute = ({ domainnames, domainDetails, resources }) => {
  const { domain, resourse } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const resourceComponents = {
    ResearchPapers: ResearchPapers,
    Notes: Notes,
    Links: Links,
    Videos: Videos,
  };

  const ResourceComponent = resourceComponents[resourse];

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <div className="container-fluid vh-100">
      <div className="row">

      {/* Mobile Menu Button */}
<div className="d-block d-md-none p-0 ">
  <button className="w-2" onClick={toggleMobileMenu}>
    {isMobileMenuOpen ? (
      <FontAwesomeIcon icon={faTimes} />
    ) : (
      <FontAwesomeIcon icon={faBars} />
    )}
  </button>
</div>

<AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="col-md-3 col-12"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 70 }}
            >
              <div className="p-3 bg-light border rounded">
                {/* Domain Dropdown */}
                <div className="mb-4">
                  <h5
                    className="d-flex align-items-center justify-content-between"
                    onClick={toggleDropdown}
                  >
                    Domains
                  
                  </h5>
                  <motion.select
                    className="form-select mt-2"
                    onChange={(e) => (window.location.href = `/resourse/${e.target.value}`)}
                    value={domain || ''}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <option value="" disabled>
                      Select a Domain
                    </option>
                    {domainnames.map((domainItem, index) => (
                      <option key={index} value={domainItem}>
                        {domainItem}
                      </option>
                    ))}
                  </motion.select>
                </div>

                {/* Resources Dropdown */}
                <div className="mb-4">
                  <h5
                    className="d-flex align-items-center justify-content-between"
                    onClick={toggleDropdown}
                  >
                    Resources
                   
                  </h5>
                  <motion.select
                    className="form-select mt-2"
                    onChange={(e) =>
                      (window.location.href = `/resourse/${domain}/${e.target.value}`)
                    }
                    value={resourse || ''}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <option value="" disabled>
                      Select a Resource
                    </option>
                    {Object.keys(resourceComponents).map((resourceKey, index) => (
                      <option key={index} value={resourceKey}>
                        {resourceKey}
                      </option>
                    ))}
                  </motion.select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>



        {/* Left Side Navigation */}
        <div className={`col-md-3 col-12 ${isMobileMenuOpen ? 'd-none' : 'd-none d-md-block'}`}>
          <div className="p-3 bg-light border rounded vh-100">
            {/* Domain Dropdown */}
            <div className="mb-4">
              <h5 className="d-flex align-items-center justify-content-between" onClick={toggleDropdown}>
                Domains
         
              </h5>
              <select
                className="form-select mt-2"
                onChange={(e) => (window.location.href = `/resourse/${e.target.value}`)}
                value={domain || ''}
              >
                <option value="" disabled>
                  Select a Domain
                </option>
                {domainnames.map((domainItem, index) => (
                  <option key={index} value={domainItem}>
                    {domainItem}
                  </option>
                ))}
              </select>
            </div>

            {/* Resources Dropdown */}
            <div className="mb-4">
              <h5 className="d-flex align-items-center justify-content-between" onClick={toggleDropdown}>
                Resources
                
              </h5>
              <select
                className="form-select mt-2"
                onChange={(e) => (window.location.href = `/resourse/${domain}/${e.target.value}`)}
                value={resourse || ''}
              >
                <option value="" disabled>
                  Select a Resource
                </option>
                {Object.keys(resourceComponents).map((resourceKey, index) => (
                  <option key={index} value={resourceKey}>
                    {resourceKey}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="col-md-9 col-12 mt-3 mt-md-0 vh-100">
          {ResourceComponent ? (
            <ResourceComponent />
          ) : (
            <Domain_details domain={domainDetails[domain]} />
          )}
        </div>

       
      </div>
    </div>
  );
};

export default DomainRoute;
