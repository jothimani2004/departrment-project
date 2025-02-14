import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import AlertMessage from "./AlertMessage";

const IEEEPapers = () => {
  const d = "http://localhost:5000";
  const { year, domain, resourse } = useParams();
  const [pdfData, setPdfData] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [messages, setMessages] = useState([]); // Changed to an array for multiple messages
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadForm, setUploadForm] = useState({ name: '', abstract: '' }); 
  const currentYear = new Date().getFullYear();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0); // New state to track the current message

  useEffect(() => {
    const fetchPdfData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/researchpaper/${year || currentYear}`);
        setPdfData(response.data.pdfs || []);
      } catch (error) {
        console.error('Error fetching PDF data:', error);
      }
    };
    fetchPdfData();
  }, []);

  useEffect(() => {
    if (messages.length > 0 && currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(currentMessageIndex + 1);
      }, 3000); // Delay of 3 seconds between each message

      return () => clearTimeout(timer);
    }
  }, [messages, currentMessageIndex]);

  const handlePdfSelect = async (_id) => {
    try {
      const result = await axios.post('http://localhost:5000/schedule-email', {
        email: 'brutalicongaming@gmail.com',
        _id: _id,
      });
  
      // Capture the success message from the backend response
      setMessages(prevMessages => [
        ...prevMessages, 
        result.data.message || 'Email will be sent after one day.'
      ]);
    } catch (error) {
      console.error('Error scheduling email:', error);
  
      // Capture the error message from the backend response
      const errorMessage = error.response?.data?.message || 'Error scheduling email.';
      
      setMessages(prevMessages => [
        ...prevMessages, 
        errorMessage // Set the error message from the backend
      ]);
    }
  };
  
  

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      setMessages(prevMessages => [
        ...prevMessages, 
        'Please select a file to upload.'
      ]);
      return;
    }
    const formData = new FormData();
    formData.append('pdf', uploadFile);
    formData.append('title', uploadForm.name);
    formData.append('abstract', uploadForm.abstract); 
    formData.append('year', year || currentYear);
    try {
      const response = await axios.post(`${d}/researchpapers`, formData);
      setMessages(prevMessages => [
        ...prevMessages, 
        response.data.message || 'PDF uploaded successfully.'
      ]);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      setMessages(prevMessages => [
        ...prevMessages, 
        'Error uploading PDF.'
      ]);
    }
  };

  const handleFileDelete = async (id) => {
    try {
      console.log(id);
      
      // Make the DELETE request to the backend to delete the PDF
      const response = await axios.delete(`${d}/delete-pdf/${id}`);
  
      // Update the messages state with a success message from the response
      setMessages(prevMessages => [
        ...prevMessages, 
        response.data.message || 'PDF deleted successfully.'
      ]);
  
      // Remove the deleted PDF from the pdfData state
      setPdfData(pdfData.filter((pdf) => pdf._id !== id)); // Use _id here
    } catch (error) {
      // Update the messages state with an error message if deletion fails
      setMessages(prevMessages => [
        ...prevMessages, 
        'Error deleting PDF.'
      ]);
    }
  };
  

  const handleYearSelect = (year) => {
    const filtered = pdfData.filter((pdf) => pdf.year === year);
    setPdfData(filtered);
    setShowFilterModal(false);
  };

  return (
      <div className="container m-2 ">
         <h1 className="font-bold my-4 text-center">{domain }</h1> {/* Display domain */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h4">{year || currentYear} Year Research Papers</h1>
          <div>
            <button className="btn btn-primary me-2" onClick={() => setShowModal(true)}>Upload PDF</button>
            <button className="btn btn-secondary" onClick={() => setShowFilterModal(true)}>Filter by Year</button>
          </div>
        </div>

        <ul className="list-group full-height" style={{ maxHeight: '92vh', overflowY: 'auto' }}>
          {pdfData.length > 0 ? (
            pdfData.map((pdf) => (
              <li key={pdf._id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <strong>Title:</strong> {pdf.title}
                  <p><b>Abstract:</b>  {pdf.abstract}</p>
                </span>
                <div>
                  <button className="btn btn-success btn-sm me-2" onClick={() => handlePdfSelect(pdf._id)}>
                    Email Paper
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleFileDelete(pdf._id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item">No PDFs available.</li>
          )}
        </ul>

        {/* Modal for Upload */}
        {showModal && (
          <div className="modal show d-block d-flex align-items-center justify-content-center">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Upload PDF</h5>
                  <button className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleFileUpload}>
                    <div className="mb-3">
                      <label className="form-label">Paper Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={uploadForm.name}
                        onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Abstract</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={uploadForm.abstract}
                        onChange={(e) => setUploadForm({ ...uploadForm, abstract: e.target.value })}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Select PDF</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="application/pdf"
                        onChange={(e) => setUploadFile(e.target.files[0])}
                        required
                      />
                    </div>
                    <button className="btn btn-primary" type="submit">Upload</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for filtering PDFs by year */}
        {showFilterModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-sm modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Filter by Year</h5>
                  <button type="button" className="btn-close" onClick={() => setShowFilterModal(false)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    {["2025",'2024', '2023', '2022', '2021', '2020'].map((year, index) => (
                      <div key={year} className="col-6 mb-2">
                        <Link to={`/resourse/${domain}/${resourse}/${year}`} onClick={() => handleYearSelect(year)} className="btn btn-outline-primary w-100 text-center">
                          {year}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alert Messages */}
        {messages.length > 0 && currentMessageIndex < messages.length && (
          <AlertMessage message={messages[currentMessageIndex]} />
        )}
      </div>
  );
};

export default IEEEPapers;
