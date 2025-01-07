import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [courseFilter, setCourseFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  // Fetch students data from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  // Filter students based on course type and year
  const filteredStudents = students.filter(student =>
    (courseFilter === '' || student.courseType === courseFilter) &&
    (yearFilter === '' || student.year === yearFilter)
  );

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Student List</h2>
        <div className="d-flex gap-3">
          {/* Filter by Year */}
          <Form.Select
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
            className="w-auto"
            aria-label="Filter by Year"
          >
            <option value="">All Years</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
          </Form.Select>
        </div>
      </div>

      {/* Table */}
      <Table striped bordered hover responsive variant="light">
        <thead>
          <tr className="table-primary">
            <th>Student Register Number</th>
            <th>Student Name</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
           
        
          {filteredStudents.length > 0 ? filteredStudents.map(student => (
            <tr key={student.registerNumber}>
              <td>{student.registerNumber}</td>
              <td>{student.name}</td>
              <td>
                <Link to={`/student/${student.registerNumber}`} className="btn btn-primary btn-sm">
                  View Details
                </Link>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" className="text-center">No students found for the selected filters.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* No students available message */}
      {filteredStudents.length === 0 && (
        <div className="text-center">
          <Button variant="secondary" onClick={() => { setCourseFilter(''); setYearFilter(''); }}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
