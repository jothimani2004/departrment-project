import React from "react";
import FacultyCard from "./FacultyCard";
import "./Faculty.css";
import { facultyData } from "../../../Content/People";


const FacultyList = () => {
 

  return (
    <div className="container mt-0 pt-4">
      <h2 className="mb-4 h1">Faculty</h2>
      {facultyData.map((faculty, index) => (
        <FacultyCard key={index} {...faculty} animationDelay={index * 0.3} />
      ))}
    </div>
  );
};

export default FacultyList;
