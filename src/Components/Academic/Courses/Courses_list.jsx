import React, { useState, useEffect } from 'react';
import { Table, Form, Spinner, Container } from 'react-bootstrap';

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("all"); // Controls the filter selection
  const [loading, setLoading] = useState(true);

  // Mock course data for testing without backend
  const Core = [
    { "Course_Code": "IOBT", "Course_Title": "Engineering Mathematics I" },
    { "Course_Code": "IOET", "Course_Title": "Basic Electrical & Electronics Engineering" },
    { "Course_Code": "IOBT", "Course_Title": "Biology for Engineers" },
    { "Course_Code": "IOBP", "Course_Title": "Basic Electrical & Electronics Engineering Lab" },
    { "Course_Code": "IOEP", "Course_Title": "Digital Fabrication Lab" },
    { "Course_Code": "IOCP", "Course_Title": "Design Thinking & Idea Lab Workshop" },
    { "Course_Code": "IOST", "Course_Title": "Programming in C" },
    { "Course_Code": "IOBT", "Course_Title": "Engineering Mathematics II" },
      { "Course_Code": "IOST", "Course_Title": "Professional English for Engineers" },
      { "Course_Code": "IOBT", "Course_Title": "Physical Science for Computer and Information Science Engineers" },
      { "Course_Code": "IOBP", "Course_Title": "Physical Science Lab" },
      { "Course_Code": "IOST", "Course_Title": "Problem Solving using Python" },
      { "Course_Code": "IOEP", "Course_Title": "Engineering Graphics and Design Lab" },
      { "Course_Code": "BT24IOBT31", "Course_Title": "Mathematics-III" },
      { "Course_Code": "BT24IOCT32", "Course_Title": "Data Structures and Algorithms" },
      { "Course_Code": "BT24IOET33", "Course_Title": "Microprocessor and Microcontroller" },
      { "Course_Code": "BT24IOCT34", "Course_Title": "Computer Organization and Architecture" },
      { "Course_Code": "BT24IOCT35", "Course_Title": "Computer Networks" },
      { "Course_Code": "BT24IOCI36", "Course_Title": "OOPS" },
      { "Course_Code": "BT24IOBT41", "Course_Title": "Discrete Mathematics" },
      { "Course_Code": "BT24IOCT42", "Course_Title": "Operating System" },
      { "Course_Code": "BT24IOCT43", "Course_Title": "Theory of Computation" },
      { "Course_Code": "BT24IOCT44", "Course_Title": "Internet of Things" },
      { "Course_Code": "BT24IOST45", "Course_Title": "Principles of Management" },
      { "Course_Code": "BT24IOCI46", "Course_Title": "Database Management System" },
      { "Course_Code": "BT24IOST51", "Course_Title": "Human Resource Management" },
      { "Course_Code": "BT24IOCT52", "Course_Title": "Blockchain Technology" },
      { "Course_Code": "BT24IOCT53", "Course_Title": "Web Technology" },
      { "Course_Code": "BT24IOCT54", "Course_Title": "IoT Architecture" },
      { "Course_Code": "BT24IOCT55", "Course_Title": "Artificial Intelligence" },
      { "Course_Code": "BT24IOIT56", "Course_Title": "Machine Learning using Python" },
      { "Course_Code": "BT24IOCT61", "Course_Title": "Cloud Computing with Blockchain" },
      { "Course_Code": "BT24IOCT62", "Course_Title": "Big Data Analytics" },
      { "Course_Code": "BT24IOCT63", "Course_Title": "Software Engineering and Project Management" },

      { "Course_Code": "BT24IOCT71", "Course_Title": "Cyber Security" },
      { "Course_Code": "BT24IOCT72", "Course_Title": "Ethical Hacking" },
 
 
  ]


const Elective=[
 
      { "Course_Code": "BT24IOLT01", "Course_Title": "Fog and Edge Computing" },
      { "Course_Code": "BT24IOLT02", "Course_Title": "Business Intelligence" },
      { "Course_Code": "BT24IOLT03", "Course_Title": "Web Security" },
      { "Course_Code": "BT24IOLT04", "Course_Title": "Wireless Adhoc and Sensor Network" },
      { "Course_Code": "BT24IOLT05", "Course_Title": "Distributed Computing Systems" },
      { "Course_Code": "BT24IOLT06", "Course_Title": "Bitcoin and Cryptocurrency Technologies" },
      { "Course_Code": "BT24IOLT07", "Course_Title": "Deep Learning" },
      { "Course_Code": "BT24IOLT08", "Course_Title": "Knowledge Engineering and Management" },
      { "Course_Code": "BT24IOLT09", "Course_Title": "Information Security and Risk Management" },
      { "Course_Code": "BT24IOLT10", "Course_Title": "Advanced Cryptography and Network Security" },
      { "Course_Code": "BT24IOLT11", "Course_Title": "Optimization Techniques" },
      { "Course_Code": "BT24IOLT12", "Course_Title": "Software Testing" },
      { "Course_Code": "BT24IOLT13", "Course_Title": "Data Warehousing & Data Mining" },
      { "Course_Code": "BT24IOLT14", "Course_Title": "Smart Contract Essentials" },
      { "Course_Code": "BT24IOLT15", "Course_Title": "Computer Vision" },
      { "Course_Code": "BT24IOLT16", "Course_Title": "Soft Computing" },

  { "Course_Code": "BT24IOOT01", "Course_Title": "IoT and Its Applications" },
      { "Course_Code": "BT24IOOT02", "Course_Title": "Database and Application Security" },
      { "Course_Code": "BT24IOOT03", "Course_Title": "5G Networks" },
      { "Course_Code": "BT24IOOT04", "Course_Title": "Cyber Laws" },
      { "Course_Code": "BT24IOOT05", "Course_Title": "Cyber Physical System" }
 
  ];


  useEffect(() => {
    setTimeout(() => {
      setCourses([...Core, ...Elective]); // Initially display all courses
      setLoading(false); // ✅ Fix: Ensure loading stops
    }, 1000);
  }, []);


  // Function to update courses when filter changes
  useEffect(() => {
    if (!loading) { // ✅ Fix: Ensure filtering only happens after data is loaded
      if (filter === "all") {
        setCourses([...Core, ...Elective]);
      } else if (filter === "CORE") {
        setCourses(Core);
      } else if (filter === "ELECTIVE") {
        setCourses(Elective);
      }
    }
  }, [filter]); // ✅ Fix: Add `loading` as a dependency


  return (
  
    <Container className="my-5">
      <h2 className="text-center mb-4">Courses Offered by the Department</h2>
      <p className="text-muted text-center mb-4">
        Here is a list of all the courses offered by our department. Use the filter to refine your search.
      </p>

      {/* Filter Dropdown */}
      <div className="d-flex justify-content-end mb-3 ">
      <Form.Select
        className="w-auto rounded-3 "
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        disabled={loading} // Disable while loading
      >
        <option value="all">All Course Types</option>
        <option value="CORE">Core</option>
        <option value="ELECTIVE">Elective</option>
      </Form.Select>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
           {/* Display Filter Name */}
           <h2 className="text-center mb-4">
           {filter === "all" ? "All Courses" : filter === "CORE" ? "Core Courses" : "Elective Courses"}
         </h2>
      
        <Table striped bordered hover responsive variant="light">
          <thead className="bg-primary text-white">
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.Course_Code}</td>
                  <td>{course.Course_Title}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  No courses available for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        </>
      )
      
      }
    </Container>
   
  );

};

export default CourseTable;
