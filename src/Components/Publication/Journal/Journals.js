import React from "react";
import { Card, Container } from "react-bootstrap";

const Journals = () => {
  const journals = [
    {
      title: "HOML-SL: IoT Based Early Disease Detection and Prediction for Sugarcane Leaf using Hybrid Optimal Machine Learning Technique",
      authors: "Selvakumar, V., and K. Seetharaman",
      journal: "Journal of Survey in Fisheries Sciences",
      volume: "10(2S)",
      pages: "3284-3309",
      year: 2022,
      index: "Scopus Indexed",
      abstract: "This paper presents an IoT-based early disease detection and prediction system for sugarcane leaves using a hybrid optimal machine learning technique...",
    },
    {
      title: "HOML-SL: IoT Based Early Disease Detection and Prediction for Sugarcane Leaf using Hybrid Optimal Machine Learning Technique",
      authors: "Selvakumar, V., and K. Seetharaman",
      journal: "Journal of Survey in Fisheries Sciences",
      volume: "10(2S)",
      pages: "3284-3309",
      year: 2022,
      index: "Scopus Indexed",
      abstract: "This paper presents an IoT-based early disease detection and prediction system for sugarcane leaves using a hybrid optimal machine learning technique...",
    },
    {
      title: "HOML-SL: IoT Based Early Disease Detection and Prediction for Sugarcane Leaf using Hybrid Optimal Machine Learning Technique",
      authors: "Selvakumar, V., and K. Seetharaman",
      journal: "Journal of Survey in Fisheries Sciences",
      volume: "10(2S)",
      pages: "3284-3309",
      year: 2022,
      index: "Scopus Indexed",
      abstract: "This paper presents an IoT-based early disease detection and prediction system for sugarcane leaves using a hybrid optimal machine learning technique...",
    },
  ];

  return (
    <Container className="mt-0 pt-4">
      <h2 className=" mb-4">Journals</h2>
      {journals.map((journal, index) => (
        <Card key={index} className="mb-5 shadow-lg pt-0 ">
          <Card.Body>
            <Card.Title className="fw-bold">{journal.title}</Card.Title>
            <Card.Text>
              <strong>Authors:</strong> {journal.authors}
            </Card.Text>
            <Card.Text>
              <strong>Journal:</strong> {journal.journal}
            </Card.Text>
            <Card.Text>
              <strong>Volume:</strong> {journal.volume}
            </Card.Text>
            <Card.Text>
              <strong>Pages:</strong> {journal.pages}
            </Card.Text>
            <Card.Text>
              <strong>Year:</strong> {journal.year}
            </Card.Text>
            <Card.Text>
              <strong>Index:</strong> {journal.index}
            </Card.Text>
            <Card.Text>
              <strong>Abstract:</strong> {journal.abstract}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Journals;
