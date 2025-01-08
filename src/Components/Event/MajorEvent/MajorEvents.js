import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import './MajorEvents.css';

const MajorEvents = () => {
  const [filter, setFilter] = useState("all");

  const events = [
    {
      id: 1,
      title: "Annual Tech Conference",
      description: "A gathering of tech enthusiasts and industry leaders.",
      image: "https://www.toppersnotes.com/wp-content/uploads/2016/08/maxresdefault.jpg",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Coding Bootcamp",
      description: "Learn full-stack development in just 8 weeks.",
      image: "https://via.placeholder.com/300",
      status: "completed",
    },
    {
      id: 3,
      title: "Design Workshop",
      description: "Master the art of UI/UX design.",
      image: "https://via.placeholder.com/300",
      status: "upcoming",
    },
    {
      id: 4,
      title: "Startup Pitch Day",
      description: "Showcase your startup ideas to potential investors.",
      image: "https://5.imimg.com/data5/GK/LR/EH/SELLER-1469653/college-event-management-service.jpg",
      status: "completed",
    },
  ];

  // Filter events based on the selected filter
  const filteredEvents = filter === "all" ? events : events.filter(event => event.status === filter);

  return (
    <Container className="mt-0 pt-4">
      <h2 className="mb-4">Major Events</h2>
      <div className="d-flex align-items-center mb-4">
        <span className="me-2">Filter:</span>
        <Form.Select
          aria-label="Filter Events"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="all">All</option>
          <option value="upcoming">Upcoming Events</option>
          <option value="completed">Completed Events</option>
        </Form.Select>
      </div>
      <Row>
        {filteredEvents.map((event) => (
          <Col key={event.id} xs={12} sm={6} md={4} className="mb-4 ">
            <Card className="shadow-sm h-100 pt-0">
              <Card.Img className="event_img" variant="top" src={event.image} alt={event.title} />
              <Card.Body>
                <Card.Title className="fw-bold">{event.title}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MajorEvents;
