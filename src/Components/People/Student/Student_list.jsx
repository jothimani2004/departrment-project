import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, Container, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UseApiGet from "../../../Custom_hook/apiGetCall";
import "./Student_list.css";
const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [yearFilter, setYearFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Search input state

  // Fetch students data from the backend
  useEffect(() => {
    async function fetchData() {
      const result = await UseApiGet("/user_detail");
      setStudents(result);
    }
    fetchData();
  }, []);

  // Filter students based on search input and year
  const filteredStudents = students.filter(student =>
    (yearFilter === '' || student.year === yearFilter) &&
    (searchQuery === '' ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.register_no.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Container className="my-4 vh-100 d-flex flex-column">
      {/* Header */}
      <Row className="mb-3">
        <Col xs={12} md={6}>
          <h2 className="fw-bold">Student List</h2>
        </Col>
      </Row>

      {/* Filters & Search Bar */}
      <Row className="mb-3 g-3">
        <Col xs={12} md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search by Name or Register Number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="shadow-sm"
            />
          </InputGroup>
        </Col>

        <Col xs={12} md={3}>
          <Form.Select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="shadow-sm"
          >
            <option value="">All Years</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
          </Form.Select>
        </Col>

        <Col xs={12} md={3} className="d-grid">
          {(yearFilter || searchQuery) && (
            <Button variant="secondary" onClick={() => { setYearFilter(''); setSearchQuery(''); }}>
              Reset Filters
            </Button>
          )}
        </Col>
      </Row>

      {/* Student Table */}
      <Table striped bordered hover responsive className="table-light shadow-sm">
        <thead>
          <tr className="table-primary">
            <th>Register Number</th>
            <th>Name</th>
            <th>Year</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
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
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No students found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default StudentTable;
