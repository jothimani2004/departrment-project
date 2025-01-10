import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import Domain_details from './Domain_details';
import Notes from '../resourse/Notes';
import ResearchPapers from '../resourse/ResearchPapers';
import Links from '../resourse/Links';
import Videos from '../resourse/Videos';

import './DomainRoute.css';

const DomainRoute = ({ domainnames, domainDetails, resources }) => {
    const { domain, resourse } = useParams(); // Gets the current domain and resource from the URL
    const [isDropdownOpen, setIsDropdownOpen] = useState(true); // Controls both dropdowns
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Controls mobile menu visibility

    const resourceComponents = {
        ResearchPapers: ResearchPapers,
        Notes: Notes,
        Links: Links,
        Videos: Videos,
    };

    const ResourceComponent = resourceComponents[resourse];

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev); // Toggle the dropdown state
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev); // Toggle the mobile menu state
    };

    return (
        <div className="d-flex h-100">
            {/* Left Side Navigation */}
            <motion.div
                className={` left bg-light vh-100 p-4 transition-transform transform ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } d-lg-block  h-100vh`}
                style={{
                    width: '100%',
                    maxWidth: '300px', // Fixed width for desktop
                }}
                initial={false}
                animate={isMobileMenuOpen ? { x: 0 } : { x: '0%' }}
                transition={{ duration: 0.3 }}
            >
                {/* Navigation Content */}
                <div>
                    <h2
                        className="font-weight-bold h5 d-flex align-items-center cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        Domains
                        {isDropdownOpen ? (
                            <FaChevronUp className="ml-2" />
                        ) : (
                            <FaChevronDown className="ml-2" />
                        )}
                    </h2>
                    <motion.div
                        initial={false}
                        animate={{ height: isDropdownOpen ? 'auto' : 0 }}
                        className="overflow-hidden"
                    >
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
                    </motion.div>
                </div>

                <div className="mt-4">
                    <h2
                        className="font-weight-bold h5 d-flex align-items-center cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        Resources
                        {isDropdownOpen ? (
                            <FaChevronUp className="ml-2" />
                        ) : (
                            <FaChevronDown className="ml-2" />
                        )}
                    </h2>
                    <motion.div
                        initial={false}
                        animate={{ height: isDropdownOpen ? 'auto' : 0 }}
                        className="overflow-hidden"
                    >
                        <select
                            className="form-select mt-2"
                            onChange={(e) =>
                                (window.location.href = `/resourse/${domain}/${e.target.value}`)
                            }
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
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Side Content */}
            <div
                className="flex-1 p-4 overflow-auto bg-white"
                style={{ marginLeft: '0%' }} // Pushes content right for desktop
            >
                {ResourceComponent ? (
                    <ResourceComponent />
                ) : (
                    <Domain_details domain={domainDetails[domain]} />
                )}
            </div>

            {/* Mobile Menu Icon */}
            <div className="d-lg-none position-fixed top-4 left-4 z-index-10">
                <button onClick={toggleMobileMenu} className="text-dark">
                    {isMobileMenuOpen ? (
                        <XIcon className="w-6 h-6" />
                    ) : (
                        <MenuIcon className="w-6 h-6" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default DomainRoute;
