import React, { useContext } from 'react';
import { DomainContext } from './DomainContext';
import { useParams, Link } from 'react-router-dom';
import Domain_name from './Domain_names';

const Domain_details = () => {
  const { resourses, domainDetails } = useContext(DomainContext);
  const { domain, resourse } = useParams(); // Get the domain from the URL
  console.log(domain);

  return (
    <div className="p-4 bg-white rounded shadow">
      <>
        <h3 className="display-1 text-dark mb-4">{domainDetails[domain].title}</h3>
        <p className="text-muted mb-5 lead">{domainDetails[domain].details}</p>
      </>
    </div>
  );
};

export default Domain_details;
