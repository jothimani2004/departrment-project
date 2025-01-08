import React from "react";

const Patents = () => {
  const patents = [
    {
      title: "AI-Based Disease Prediction",
      inventors: "Dr. X, Dr. Y",
      patentNumber: "US12345678",
      filingDate: "2020-01-15",
      grantDate: "2022-06-30",
    },
  ];

  return (
    <div>
      <h2>Patents</h2>
      {patents.map((patent, index) => (
        <div key={index} className="mb-4">
          <h5 className="fw-bold">{patent.title}</h5>
          <p className="mb-1">
            <strong>Inventors:</strong> {patent.inventors}
          </p>
          <p className="mb-1">
            <strong>Patent Number:</strong> {patent.patentNumber}
          </p>
          <p className="mb-1">
            <strong>Filing Date:</strong> {patent.filingDate}
          </p>
          {patent.grantDate && (
            <p className="text-muted">
              <strong>Grant Date:</strong> {patent.grantDate}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Patents;
