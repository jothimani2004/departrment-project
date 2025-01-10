import React from "react";
import FacultyCard from "./FacultyCard";
import "./Faculty.css";


const FacultyList = () => {
  const facultyData = [
    {
      photo: "https://via.placeholder.com/80",
      name: "John Doe",
      degree: "PhD in Computer Science",
      role: "Head of Department",
      joiningDate: "Jan 10, 2010",
      description:" Line 147:21:  The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-vali"
    },
    {
      photo: "https://via.placeholder.com/80",
      name: "Jane Smith",
      degree: "MSc in Mathematics",
      role: "Lecturer",
      joiningDate: "Aug 5, 2015",
      description:" Line 147:21:  The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-vali"

    },
    {
      photo: "https://via.placeholder.com/80",
      name: "Mike Johnson",
      degree: "MBA",
      role: "Administrative Officer",
      joiningDate: "March 20, 2018",
      description:" Line 147:21:  The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-vali"

    },
  ];

  return (
    <div className="container mt-0 pt-4">
      <h2 className="mb-4">Faculty</h2>
      {facultyData.map((faculty, index) => (
        <FacultyCard key={index} {...faculty} animationDelay={index * 0.3} />
      ))}
    </div>
  );
};

export default FacultyList;
