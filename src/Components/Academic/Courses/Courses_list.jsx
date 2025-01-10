import React, { useState, useEffect } from 'react';
import { Table, Form, Spinner, Container } from 'react-bootstrap';

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock course data for testing without backend
  const mockCourses = [
    { subjectCode: 'CS101', courseName: 'Introduction to Computer Science', courseType: 'CORE', lastModified: '2024-01-01' },
    { subjectCode: 'CS102', courseName: 'Data Structures', courseType: 'CORE', lastModified: '2023-12-15' },
    { subjectCode: 'CS201', courseName: 'Web Development', courseType: 'ELECTIVE', lastModified: '2023-11-20' },
    { subjectCode: 'CS202', courseName: 'Machine Learning', courseType: 'ELECTIVE', lastModified: '2023-10-10' },
    { subjectCode: 'CS301', courseName: 'Artificial Intelligence', courseType: 'CORE', lastModified: '2023-09-05' },
  ];

  // Simulate fetching data with a delay
  useEffect(() => {
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1000); // Delay of 1 second to simulate API call
  }, []);

  // Filter courses based on course type
  const filteredCourses = courses.filter(course => {
    return filter === 'all' || course.courseType === filter;
  });

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Courses Offered by the Department</h2>
      <p className="text-muted text-center mb-4">
        Here is a list of all the courses offered by our department. Use the filter to refine your search.
      </p>

      {/* Filter Dropdown */}
      <div className="d-flex justify-content-end mb-3">
        <Form.Select
          className="w-auto"
          value={filter}
          onChange={e => setFilter(e.target.value)}
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
        <Table striped bordered hover responsive variant="light">
          <thead className="bg-primary text-white">
            <tr>
              <th>Subject Code</th>
              <th>Course Name</th>
              <th>Course Type</th>
              <th>Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <tr key={course.subjectCode}>
                  <td>{course.subjectCode}</td>
                  <td>{course.courseName}</td>
                  <td>{course.courseType}</td>
                  <td>{new Date(course.lastModified).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No courses available for the selected filter.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default CourseTable;
