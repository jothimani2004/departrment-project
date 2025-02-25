import React, { useState, useEffect } from 'react';
import { Table, Form, Spinner, Container } from 'react-bootstrap';
import { Core,Elective } from '../../../Content/course';
import './course.css';

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("all"); // Controls the filter selection
  const [loading, setLoading] = useState(true);



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
      <div className="d-flex mb-3 option-box">
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
              <th className='text-center'>Course Code</th>
              <th className='text-center'>Course Title</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <tr key={index}>
                  <td className='left-side'>{course.Course_Code.replace(/\s+/g, ' ')}</td>
                  <td className='right-side'>{course.Course_Title}</td>
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
