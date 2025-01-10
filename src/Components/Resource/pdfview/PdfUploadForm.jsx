import React, { useState } from 'react';

function PdfUploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a PDF file.');
      return;
    }

    const formData = new FormData();
    console.log(formData)
    formData.append('pdf', file);
    console.log(formData)

    try {
      const response = await fetch('http://localhost:5000/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message || 'Upload successful');
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setMessage('Error uploading PDF');
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PdfUploadForm;
