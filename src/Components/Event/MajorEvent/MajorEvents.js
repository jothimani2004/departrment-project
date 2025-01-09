import React, { useState } from "react";
import { Container, Row, Col, Card, Form ,Button } from "react-bootstrap";
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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTumGyXJu3wf2ndvQfES0rPAAzUphCgUsoRSw&s",
      status: "completed",
    },
    {
      id: 3,
      title: "Design Workshop",
      description: "Master the art of UI/UX design.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOjd-5JoER-fTaHpPvl4jbAVNrsV-OhdRhfQ&s",
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
              <Card.Body>
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
                  href={event.link}
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
