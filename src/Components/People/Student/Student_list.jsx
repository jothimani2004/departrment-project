import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UseApiGet from "../../../Custom_hook/apiGetCall";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [courseFilter, setCourseFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [mockData,setMockData] = useState([])

  // Fetch students data from the backend (using mock data for now)
  useEffect(() => {
    // Sample data
    // const mockData = [
    //   { registerNumber: 'S12345', name: 'John Doe',  year: '1' },
    //   { registerNumber: 'S12346', name: 'Jane Smith',  year: '2' },
    //   { registerNumber: 'S12347', name: 'Sam Brown',  year: '3' },
    //   { registerNumber: 'S12348', name: 'Anna Taylor', year: '4' },
    //   { registerNumber: 'S12349', name: 'Michael Johnson', year: '1' },
    // ];
    async function call(){
          const result = await UseApiGet("/user_detail")
          setStudents(result);
    }

    call()
  }, []);

  // Filter students based on course type and year
  const filteredStudents = students.filter(student =>
    (yearFilter === '' || student.year === yearFilter)
  );

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col md={8}>
          <h2 className="fw-bold">Student List</h2>
        </Col>
        <Col md={4} className="d-flex gap-3 align-items-center justify-content-end">
         

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
        </Col>
      </Row>

      {/* Table */}
      <Table striped bordered hover responsive variant="light">
        <thead>
          <tr className="table-primary">
            <th>Register Number</th>
            <th>Name</th>
           
            <th>Year</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? filteredStudents.map(student => (
            <tr key={student.register_no}>
              <td>{student.register_no}</td>
              <td>{student.name}</td>
              
              <td>{student.year}</td>
              <td>
                <Link to={`/People/Students/Profile?register_no=${student.register_no}`} className="btn btn-primary btn-sm">
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

      {/* Reset Filters */}
      {filteredStudents.length === 0 && (
        <div className="text-center">
          <Button variant="secondary" onClick={() => { setCourseFilter(''); setYearFilter(''); }}>
            Reset Filters
          </Button>
        </div>
      )}
    </Container>
  );
};

export default StudentTable;
