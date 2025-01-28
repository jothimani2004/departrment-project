import React, { useState } from "react";
import { Container, Row, Col, Card, Form ,Button } from "react-bootstrap";
import './MajorEvents.css';
import { events } from "../../../Content/Event";

const MajorEvents = () => {
  const [filter, setFilter] = useState("all");

  

  // Filter events based on the selected filter
  const filteredEvents = filter === "all" ? events : events.filter(event => event.status === filter);

  return (
    <Container className="mt-5 mb-5  pt-4">
      <h2 className="text-center mb-5">Upcoming Events</h2>
      <Row xs={1} sm={2} md={2} className="g-5">
        {events.map((event, index) => (
          <Col key={index}>
            <Card className="event-card  pt-0">
              <Card.Img
                variant="top"
                src={event.image}
                alt={event.title}
                className="event-img"
              />
              <Card.Body className="s_b t_c rounded-3">
                <Card.Title className="event-title">{event.title}</Card.Title>
                <Card.Text className="event-description">
                  {event.description}
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">
                    Date: {event.date} | Location: {event.location}
                  </small>
                </Card.Text>
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-2"
                  href="/Event/Major_events/Event_detail"
                >
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MajorEvents;
