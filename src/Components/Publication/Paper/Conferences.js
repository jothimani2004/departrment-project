import React from "react";
import { Card, Container } from "react-bootstrap";
import './Conference.css';

const Conferences = () => {
  const conferences = [
    {
      title: "Feature Extraction and Classification Based on Pixel in Banana Fruit for Disease Detection Using Neural Networks",
      authors: "Mahendran, T., Seetharaman, K., Ramakrishnan, S.",
      conference: "Third International Conference on Advances in Electrical, Computing, Communication and Sustainable Technologies (ICAECT)",
      location: "IEEE Xplore, Online Conference",
      year: 2023,
      pages: "1-7",
      doi: "10.1109/ICAECT57570.2023.10117959",
      abstract: "This paper presents an advanced method for feature extraction and classification based on pixel analysis in banana fruit images. The study employs neural networks to detect diseases such as black Sigatoka and Panama wilt in banana plants, contributing to better agricultural practices.",
      keywords: ["Feature Extraction", "Machine Learning", "Neural Networks", "Agriculture", "Disease Detection"],
      proceedings: "Proceedings of ICAECT 2023",
      organizer: "IEEE, Department of Electrical Engineering",
      link: "https://ieeexplore.ieee.org/document/10117959",
    },
    {
      title: "AI in Healthcare: Transforming Patient Care and Medical Research",
      authors: "Dr. A, Dr. B, Dr. C",
      conference: "International AI Conference on Healthcare Technologies",
      location: "London, UK",
      year: 2021,
      pages: "35-45",
      doi: "10.1109/AIHC2021.3456789",
      abstract: "This paper explores the role of artificial intelligence in revolutionizing the healthcare sector, particularly in diagnostics, patient care, and medical research. It covers the integration of AI tools like machine learning, natural language processing, and computer vision in various medical applications.",
      keywords: ["AI in Healthcare", "Medical Research", "Machine Learning", "Diagnostics", "Patient Care"],
      proceedings: "Proceedings of AIHC 2021",
      organizer: "International AI Consortium",
      link: "https://ieeexplore.ieee.org/document/3456789",
    },
    {
      title: "Blockchain for Secure Health Data Sharing: A Decentralized Solution",
      authors: "Samuel Williams, Natasha Green, Jacob Lee",
      conference: "International Conference on Blockchain Technology in Health Systems",
      location: "Berlin, Germany",
      year: 2022,
      pages: "58-67",
      doi: "10.1109/ICBTHS2022.0088763",
      abstract: "This conference paper proposes a blockchain-based solution to securely share medical data across different health systems. The method addresses privacy concerns while enabling interoperability between healthcare providers, using smart contracts and decentralized storage.",
      keywords: ["Blockchain", "Health Data", "Smart Contracts", "Data Privacy", "Health Systems"],
      proceedings: "Proceedings of ICBTHS 2022",
      organizer: "Global Blockchain Technology Network",
      link: "https://ieeexplore.ieee.org/document/0088763",
    },
    {
      title: "5G Technologies in Smart Cities: Connecting the Future",
      authors: "Eleanor Brooks, Thomas Lee, Daniel Williams",
      conference: "International Conference on Next-Gen 5G Networks and Smart Cities",
      location: "New York, USA",
      year: 2023,
      pages: "45-53",
      doi: "10.1109/5GSmartCities2023.0085642",
      abstract: "This paper investigates the impact of 5G technologies on the development of smart cities. It focuses on how 5G networks can enhance connectivity, enable real-time monitoring, improve urban mobility, and foster sustainability in cities.",
      keywords: ["5G", "Smart Cities", "IoT", "Urban Mobility", "Sustainability"],
      proceedings: "Proceedings of 5GSmartCities 2023",
      organizer: "IEEE Smart Cities Initiative",
      link: "https://ieeexplore.ieee.org/document/0085642",
    },
    {
      title: "Quantum Computing and Its Potential to Revolutionize Cryptography",
      authors: "Grace Wilson, Samuel Newton, Oliver Park",
      conference: "International Quantum Computing Symposium",
      location: "San Francisco, USA",
      year: 2020,
      pages: "122-130",
      doi: "10.1109/QuantumCrypt2020.0098765",
      abstract: "This paper discusses the groundbreaking potential of quantum computing in the field of cryptography, including quantum key distribution, post-quantum cryptography algorithms, and the implications of quantum supremacy on traditional encryption methods.",
      keywords: ["Quantum Computing", "Cryptography", "Quantum Key Distribution", "Post-Quantum", "Encryption"],
      proceedings: "Proceedings of QuantumCrypt 2020",
      organizer: "Institute for Quantum Technologies",
      link: "https://ieeexplore.ieee.org/document/0098765",
    },
  ];
  

  return (
    <Container className="mt-0 pt-4">
      <h2 className="mb-4 text-center">Conferences</h2>
      {conferences.map((conference, index) => (
        <Card
          key={index}
          className="conference-card mb-5 shadow-lg pt-0"
          style={{
            animationDelay: `${index * 0.3}s`,
          }}
        >
          <Card.Body className="s_b t_c rounded-3">
            <Card.Title className="fw-bold">{conference.title}</Card.Title>
            <Card.Text>
              <strong>Authors:</strong> {conference.authors}
            </Card.Text>
            <Card.Text>
              <strong>Conference:</strong> {conference.conference}
            </Card.Text>
            {conference.location && (
              <Card.Text>
                <strong>Location:</strong> {conference.location}
              </Card.Text>
            )}
            <Card.Text>
              <strong>Year:</strong> {conference.year}
            </Card.Text>
            {conference.pages && (
              <Card.Text>
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
                  style={{ textDecoration: 'none', color: '#495057' }}
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
