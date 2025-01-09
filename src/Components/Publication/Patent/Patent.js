import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import './Patent.css'

const Patents = () => {
  const patents = [
    {
      title: "A Method of Retrieving Satellite Image for Remote Sensing Applications",
      applicationNumber: "202241031679",
      grantNumber: "418134",
      dateGranted: "16/01/2023",
      patentee: "Annamalai University",
      abstract: "This invention provides a method for efficiently retrieving satellite images for remote sensing applications, with improved resolution and accuracy using neural network-based algorithms.",
      keywords: ["Satellite Imaging", "Remote Sensing", "Neural Networks", "Data Retrieval"],
      assignee: "Annamalai University Department of Geospatial Sciences",
      internationalApplication: "PCT/IN2023/123456",
    },
    {
      title: "Method for Improved Water Purification Using Advanced Filtration Technology",
      applicationNumber: "202241045783",
      grantNumber: "418589",
      dateGranted: "02/04/2023",
      patentee: "University of Delhi",
      abstract: "A new filtration technology that uses an innovative composite material to improve the purification of water by removing heavy metals and pathogens, making water safer for drinking and industrial use.",
      keywords: ["Water Purification", "Filtration Technology", "Heavy Metal Removal", "Water Safety"],
      assignee: "University of Delhi Department of Environmental Engineering",
      internationalApplication: "PCT/IN2023/654321",
    },
    {
      title: "Innovative Biodegradable Plastic Packaging for Sustainable Development",
      applicationNumber: "202241079234",
      grantNumber: "418788",
      dateGranted: "25/05/2023",
      patentee: "Indian Institute of Technology, Madras",
      abstract: "This patent proposes a biodegradable plastic material made from natural polymers that offers a more sustainable alternative to traditional plastic, reducing environmental pollution and promoting sustainable packaging.",
      keywords: ["Biodegradable Plastic", "Sustainability", "Environmental Impact", "Green Packaging"],
      assignee: "Indian Institute of Technology, Madras, Department of Materials Science",
      internationalApplication: "PCT/IN2023/789654",
    },
    {
      title: "Artificial Intelligence System for Predictive Healthcare Diagnosis",
      applicationNumber: "202241087653",
      grantNumber: "418999",
      dateGranted: "10/06/2023",
      patentee: "Manipal University",
      abstract: "This invention relates to a healthcare system using artificial intelligence for the early detection and prediction of various diseases based on patient data analysis, improving diagnosis efficiency and patient care.",
      keywords: ["Artificial Intelligence", "Healthcare", "Predictive Diagnosis", "Medical Technology"],
      assignee: "Manipal University Department of Healthcare Technology",
      internationalApplication: "PCT/IN2023/654987",
    },
    {
      title: "Efficient Energy Storage and Conversion System for Solar Power Applications",
      applicationNumber: "202241099876",
      grantNumber: "419111",
      dateGranted: "15/07/2023",
      patentee: "National Institute of Technology, Karnataka",
      abstract: "An energy storage and conversion system designed to optimize the efficiency of solar power generation and distribution, providing better energy storage solutions for grid integration and reducing energy wastage.",
      keywords: ["Energy Storage", "Solar Power", "Energy Conversion", "Sustainable Energy"],
      assignee: "National Institute of Technology, Karnataka, Department of Renewable Energy",
      internationalApplication: "PCT/IN2023/321654",
    },
  ];

  return (
    <Container className="mt-0 pt-4">
      <h2 className="mb-4 text-center">Patents</h2>
      <Row>
        {patents.map((patent, index) => (
          <Col key={index} xs={12}>
            <Card
              className="patent-card mb-4 border-2 rounded-lg overflow-hidden"
              style={{
                animationDelay: `${index * 0.3}s`,
              }}
            >
              <Card.Body>
                <Card.Title className="fw-bold text-dark">{patent.title}</Card.Title>
                <Card.Text>
                  <strong>Application Number:</strong> {patent.applicationNumber}
                </Card.Text>
                <Card.Text>
                  <strong>Grant Number:</strong> {patent.grantNumber}
                </Card.Text>
                <Card.Text>
                  <strong>Date Granted:</strong> {patent.dateGranted}
                </Card.Text>
                <Card.Text>
                  <strong>Patentee:</strong> {patent.patentee}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Patents;
