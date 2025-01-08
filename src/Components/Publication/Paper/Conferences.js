import React from "react";
import { Card, Container } from "react-bootstrap";

const Conferences = () => {
  const conferences = [
    {
      title: "Feature Extraction and Classification Based on Pixel in Banana Fruit for Disease Detection Using Neural Networks",
      authors: "Mahendran, T., Seetharaman, K.",
      conference: "Third International Conference on Advances in Electrical, Computing, Communication and Sustainable Technologies (ICAECT)",
      location: "IEEE Xplore",
      year: 2023,
      pages: "1-7",
      doi: "10.1109/ICAECT57570.2023.10117959",
    },
    {
      title: "AI in Healthcare",
      authors: "Dr. A, Dr. B",
      conference: "International AI Conference",
      location: "London, UK",
      year: 2021,
      pages: "35-45",
      doi: "10.1109/AIHC2021.3456789",
    },
  ];

  return (
    <Container className="mt-0 pt-4">
      <h2 className=" mb-4" >Conferences</h2>
      {conferences.map((conference, index) => (
        <Card 
          key={index} 
          className="mb-5 shadow-lg pt-0" 
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #D1D8E0',
            transition: 'transform 0.3s ease-in-out',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Card.Body>
            <Card.Title className="fw-bold" >
              {conference.title}
            </Card.Title>
            <Card.Text >
              <strong>Authors:</strong> {conference.authors}
            </Card.Text>
            <Card.Text >
              <strong>Conference:</strong> {conference.conference}
            </Card.Text>
            {conference.location && (
              <Card.Text >
                <strong>Location:</strong> {conference.location}
              </Card.Text>
            )}
            <Card.Text >
              <strong>Year:</strong> {conference.year}
            </Card.Text>
            {conference.pages && (
              <Card.Text >
                <strong>Pages:</strong> {conference.pages}
              </Card.Text>
            )}
            {conference.doi && (
              <Card.Text style={{ color: '#495057' }}>
                <strong>DOI:</strong> 
                <a 
                  href={`https://doi.org/${conference.doi}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{  textDecoration: 'none' }}
                >
                  {conference.doi}
                </a>
              </Card.Text>
            )}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Conferences;
