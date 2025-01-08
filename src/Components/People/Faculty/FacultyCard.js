import React from "react";

import "./Faculty.css";
const FacultyCard = ({ photo, name, degree, role, joiningDate,description }) => {
  return (
    <div className="card mb-3 shadow-lg p-3">
      <div className="row g-5 flex-column flex-md-row align-items-center align-items-md-start">
        {/* Faculty Photo */}
        <div className="col-auto text-center">
          <img
            src={photo}
            alt={`${name}'s profile`}
            className="img-fluid rounded-circle mb-3"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Faculty Details */}
        <div className="col text-center text-md-start ">
          <h5 className="fw-bold mb-1">
            {name} <span className="text-muted fw-normal ms-2">{degree}</span>
          </h5>
          <p className="mb-1">
            <strong>Role:</strong> {role}
          </p>
          <p className="text-muted">
            <strong>Joined:</strong> {joiningDate}
          </p>
          <p className="text-muted">
            <strong>description:</strong> {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacultyCard;
