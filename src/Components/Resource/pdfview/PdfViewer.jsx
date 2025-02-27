import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';

const PdfViewer = () => {
  const { domain, resourse, year } = useParams(); // Get route params
  const [searchParams] = useSearchParams(); // Get query params
  const pdftitle = searchParams.get("pdftitle"); // Get the 'pdfName' query param

  const [pdfUrl, setPdfUrl] = useState(null); // State to store the fetched PDF URL
  const back_api = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(`${back_api}/resource/pdfview`, {
          params: { pdftitle, resourse: resourse },
        });

        // Handle the buffer data
        const buffer = response.data.buffer; // Access the buffer data from the response
        const byteArray = new Uint8Array(buffer.data); // Create a Uint8Array from the buffer data
        const blob = new Blob([byteArray], { type: 'application/pdf' }); // Create a Blob from the byte array
        const url = window.URL.createObjectURL(blob); // Create a URL for the Blob

        setPdfUrl(url); // Set the URL for displaying the PDF
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    if (pdftitle) {
      fetchPdf();
    }
  }, [pdftitle, resourse]); // Ensure the effect runs when pdftitle or resource changes

  return (
    <div className="mt-4">
       {pdftitle && <h2 className="text-xl font-bold mb-4">PDF title: {pdftitle}</h2>}
      {pdfUrl ? (
        <iframe src={pdfUrl} width="100%" height="600px" className="border border-gray-300 rounded"></iframe>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default PdfViewer;
