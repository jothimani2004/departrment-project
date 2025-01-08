import React from "react";
import { Card, Container } from "react-bootstrap";

const Patents = () => {
  const patents = [
    {
      title: "A Method of Retrieving Satellite Image",
      applicationNumber: "202241031679",
      grantNumber: "418134",
      dateGranted: "16/01/2023",
      patentee: "Annamalai University",
    },
    {
      title: "A Method of Retrieving Satellite Image",
      applicationNumber: "202241031679",
      grantNumber: "418134",
      dateGranted: "16/01/2023",
      patentee: "Annamalai University",
    },
    {
      title: "A Method of Retrieving Satellite Image",
      applicationNumber: "202241031679",
      grantNumber: "418134",
      dateGranted: "16/01/2023",
      patentee: "Annamalai University",
    },
  ];

  return (
    <Container className="mt-0 pt-4">
      <h2 className=" mb-4 ">Patents</h2>
      {patents.map((patent, index) => (
        <Card key={index} className="mb-5 shadow-lg pt-0">
          <Card.Body>
            <Card.Title className="fw-bold">{patent.title}</Card.Title>
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
      ))}
    </Container>
  );
};

export default Patents;
