import React from "react";

const Journals = () => {
  const journals = [
    {
      title: "Deep Learning for Image Recognition",
      authors: "Dr. A, Dr. B",
      journal: "Journal of AI Research",
      volume: "12",
      issue: "3",
      pages: "123-145",
      year: 2022,
    },
    {
      title: "AI in Medicine",
      authors: "Dr. C, Dr. D",
      journal: "Medical AI Journal",
      volume: "5",
      issue: "1",
      pages: "15-30",
      year: 2021,
    },
  ];

  return (
    <div>
      <h2>Journals</h2>
      {journals.map((journal, index) => (
        <div key={index} className="mb-4">
          <h5 className="fw-bold">{journal.title}</h5>
          <p className="mb-1">
            <strong>Authors:</strong> {journal.authors}
          </p>
          <p className="mb-1">
            <strong>Journal:</strong> {journal.journal}, Vol. {journal.volume}, Issue {journal.issue}, Pages: {journal.pages}
          </p>
          <p className="text-muted">
            <strong>Year:</strong> {journal.year}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Journals;
