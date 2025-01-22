import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PdfViewer from '../pdfview/NoteViewer';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';

const IEEEPapers = () => {
  const { year, domain, resourse } = useParams();
  const [pdfData, setPdfData] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadForm, setUploadForm] = useState({ name: '' });
  const [selectedYear, setSelectedYear] = useState(null); // Added
  const [filteredPdfs, setFilteredPdfs] = useState([]); // Added
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    




    const fetchPdfData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/researchpaper/${year || currentYear}`);
        setPdfData(response.data.pdfs || []);
        const cookieValue = Cookies.get('Access');
        if (cookieValue) {
          const userRole = JSON.parse(cookieValue).role;
          setIsTeacher(userRole === 'teacher');
        }
      } catch (error) {
        console.error('Error fetching PDF data:', error);
      }
    };

    fetchPdfData();
  }, [year]);

  const handlePdfSelect = async (pdfName) => {
    setSelectedPdf(pdfName);
    try {
      await axios.post('http://localhost:5000/schedule-email', {
        email: 'gowthamhirthick@gmail.com',
        pdfTitle: pdfName,
      });
      setMessage('Email will be sent after one day.');
    } catch (error) {
      console.error('Error scheduling email:', error);
      setMessage('Error scheduling email.');
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      setMessage('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('pdf', uploadFile);
    formData.append('title', uploadForm.name);
    formData.append('year', year || currentYear);

    try {
      const response = await axios.post('/researchpapers', formData);
      setMessage(response.data.message || 'PDF uploaded successfully.');
      setPdfData([...pdfData, response.data.pdf]);
      setShowModal(false);
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setMessage('Error uploading PDF.');
    }
  };

  const handleFileDelete = async (title) => {
    try {
      const response = await axios.delete(`/delete-pdf/${title}/${resourse}`);
      setMessage(response.data.message || 'PDF deleted successfully.');
      setPdfData(pdfData.filter((pdf) => pdf.name !== title));
    } catch (error) {
      console.error('Error deleting PDF:', error);
      setMessage('Error deleting PDF.');
    }
  };


  // Handle year selection for filtering
  const handleYearSelect = (year) => {
    setSelectedYear(year);
  
    // Filter the PDFs by the selected year
    const filtered = pdfData.filter((pdf) => pdf.year === year); // Assuming 'year' exists in the PDF data
    setPdfData(filtered); // Update the displayed PDF data based on the selected year
    setShowFilterModal(false); // Close the modal after selecting a year
  };

  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
  };

  return (
    <div className="container m-2">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4">{year || currentYear} Year Research Papers</h1>
        <div>
          <button className="btn btn-primary me-2" onClick={() => setShowModal(true)}>Upload PDF</button>
          <button className="btn btn-secondary" onClick={() => setShowFilterModal(true)}>Filter by Year</button>
        </div>
      </div>

      <ul className="list-group">
        {pdfData.length > 0 ? (
          pdfData.map((pdf) => (
            <li key={pdf.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                <strong>Title:</strong> {pdf.title}
              </span>
              <div>
                <button className="btn btn-success btn-sm me-2" onClick={() => handlePdfSelect(pdf.title)}>
                  Email Paper
                </button>
                {isTeacher && (
                  <button className="btn btn-danger btn-sm" onClick={() => handleFileDelete(pdf.title)}>
                    Delete
                  </button>
                )}
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
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseFilterModal}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <div className="row">
            {[
              '2024',
              '2023',
              '2022',
              '2021',
              '2020',
              '2019',
              '2018',
              '2017',
              '2016',
              '2015',
              '2014',
              '2013',
              '2012',
            ].map((year, index) => (
              <div key={year} className="col-6 mb-2">
                <Link
                  to={`/resourse/${domain}/${resourse}/${year}`}
                  onClick={() => handleYearSelect(year)}
                  className="btn btn-outline-primary w-100 text-center"
                >
                  {year}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseFilterModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}


      

      {/* Message */}
      {message && (
        <div className="alert alert-info mt-4" role="alert">
          {message}
        </div>
      )}

      {/* Pdf Viewer */}
      {selectedPdf && <PdfViewer pdfName={selectedPdf} />}
    </div>
  );
};

export default IEEEPapers;
