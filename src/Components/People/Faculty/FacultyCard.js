import React from "react";
import "./Faculty.css";

const FacultyCard = ({ photo, name, degree, role, joiningDate, description, animationDelay }) => {
  return (
    <div
      className="card faculty-card mb-4 p-4 border-0 rounded-4 fade-in-up t_c "
      style={{
        animationDelay: `${animationDelay}s`, 
        background:"#b7c2f3",
        // Delay for staggered animation
      }}
    >
      <div className="row g-4 flex-column flex-md-row align-items-center align-items-md-start ">
        {/* Faculty Photo */}
        <div className="col-auto text-center">
          <img
            src={photo}
            alt={`${name}'s profile`}
            className="img-fluid rounded-circle"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              border: "3px solid #f0f0f0",
            }}
          />
        </div>

        {/* Faculty Details */}
        <div className="col text-center text-md-start">
          <h5 className="fw-bold mb-2" style={{ color: "#2b2b2b" }}>
            {name} <span className="text-muted fw-normal ms-2">{degree}</span>
          </h5>
          <p className="mb-2" style={{ color: "#555" }}>
            <strong>Role:</strong> {role}
          </p>
          <p className="mb-2 text-muted">
            <strong>Joined:</strong> {joiningDate}
          </p>
          <p className="mb-0 text-muted">
            <strong>Description:</strong> {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacultyCard;
