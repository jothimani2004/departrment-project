import React from "react";
import { Card, Container } from "react-bootstrap";
import './Journal.css';

const Journals = () => {
  const journals = [
    {
      title: "A Study on Data Science Trends and Machine Learning Algorithms",
      authors: "John Doe, Jane Smith, Emily White",
      journal: "Journal of Computer Science and Technology",
      volume: "24",
      pages: "123-130",
      year: "2023",
      index: "SCI",
      abstract: "This paper explores the latest trends in data science, including emerging machine learning algorithms, and their real-world applications across industries such as healthcare, finance, and technology.",
      keywords: ["Data Science", "Machine Learning", "Artificial Intelligence", "Big Data", "Healthcare"],
      doi: "10.1007/JCS2023.0001234",
    },
    {
      title: "Innovations in Artificial Intelligence: A Comprehensive Review",
      authors: "Alice Brown, Bob White, Michael Green",
      journal: "AI Research Journal",
      volume: "12",
      pages: "45-58",
      year: "2022",
      index: "Scopus",
      abstract: "This article provides an in-depth review of the latest innovations in AI, focusing on deep learning, reinforcement learning, and AI ethics. It also explores future trends in AI applications for automation and decision-making.",
      keywords: ["Artificial Intelligence", "Deep Learning", "Reinforcement Learning", "AI Ethics", "Automation"],
      doi: "10.1109/AIRes2022.0056738",
    },
    {
      title: "Blockchain Technology in Finance: Challenges and Opportunities",
      authors: "Charlie Green, Lisa Black, James Brown",
      journal: "Finance and Technology Journal",
      volume: "8",
      pages: "78-85",
      year: "2021",
      index: "Web of Science",
      abstract: "This paper investigates the impact of blockchain technology on the finance industry, focusing on the potential benefits of decentralized finance (DeFi), the challenges of regulatory compliance, and the future of smart contracts.",
      keywords: ["Blockchain", "Decentralized Finance", "Finance", "Smart Contracts", "Regulatory Compliance"],
      doi: "10.1109/FinTech2021.0078891",
    },
    {
      title: "Quantum Computing and Its Application in Cryptography",
      authors: "Sarah White, Robert Black, David Green",
      journal: "International Journal of Quantum Computing",
      volume: "5",
      pages: "12-22",
      year: "2020",
      index: "IEEE Xplore",
      abstract: "This paper explores the potential applications of quantum computing in cryptography, including quantum key distribution and the risks posed by quantum computing to traditional encryption methods.",
      keywords: ["Quantum Computing", "Cryptography", "Quantum Key Distribution", "Encryption", "Cybersecurity"],
      doi: "10.1109/IJQC2020.0098765",
    },
    {
      title: "The Future of 5G Networks and Internet of Things (IoT)",
      authors: "Michael Grey, Patricia Blue, Angela Brown",
      journal: "Telecommunications and Networking Journal",
      volume: "15",
      pages: "1-10",
      year: "2023",
      index: "EI Compendex",
      abstract: "This paper discusses the impact of 5G networks on the expansion of IoT technologies, highlighting challenges in connectivity, network architecture, and security considerations for widespread IoT adoption.",
      keywords: ["5G", "IoT", "Telecommunications", "Network Architecture", "Security"],
      doi: "10.1109/TNCJ2023.0054321",
    },
  ];
  

  return (
    <Container className="mt-0 pt-4 ">
      <h2 className="mb-4 text-center">Journals</h2>
      {journals.map((journal, index) => (
        <Card
          key={index}
          className="journal-card mb-5 shadow-lg pt-0"
          style={{
            animationDelay: `${index * 0.3}s`,
          }}
        >
          <Card.Body className="s_b rounded-3 t_c">
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
