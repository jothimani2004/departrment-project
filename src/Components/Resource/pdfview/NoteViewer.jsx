  import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";

const FileViewer = () => {
  const { domain } = useParams();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const fileName = searchParams.get("title");
  const [fileSrc, setFileSrc] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [progress, setProgress] = useState(0);





  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getFile/${id}/${fileName}`, {
        
          onDownloadProgress: (progressEvent) => {
            console.log(progressEvent);
            if (progressEvent.lengthComputable) {

              const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              setProgress(percent);
            }
          },
        });
        console.log(response.data.type);
        if (response.data.file && response.data.type) {
          // Create a valid Data URL for rendering
          const fileURL = `data:${response.data.type};base64,${response.data.file}`;
          setFileSrc(fileURL);
          setFileType(response.data.type);
          setProgress(100);
         
        }
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    if (id && fileName) {
      fetchFile();
    }
  }, [id, fileName]);

  // Render file based on type
  const renderFile = () => {
    if (!fileType) {
      return (
        <div className="d-flex flex-column align-items-center mt-5">
          <div className="bg-secondary rounded w-50 p-4 mb-2 placeholder-wave"></div>

          {/* Progress Bar */}
          <div className="progress w-50">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {progress}%
            </div>
          </div>

          <p className="text-muted mt-2">Loading file... {progress}%</p>
        </div>
      );
    }

    
    

    if (fileType.includes("pdf")) {
      return <iframe src={fileSrc} className="w-100" style={{ height: "100vh" }} />;
    } else if (fileType.includes("image")) {
      return <img src={fileSrc} alt={fileName} className=" m-4 w-100" style={{ height: "100vh" }} />;
    } else if (fileType.includes("video")) {
      return <video controls src={fileSrc} className="w-100 rounded shadow" />;
    } else {
      return (
        <a href={fileSrc} download={fileName} className="btn btn-primary">
          Download {fileName}
        </a>
      );
    }
  };

  return (
    <div className="container align-center my-4 min-vh-100">
      <h3 className="my-3">Domain: {domain}</h3>
      <h4 className="mb-4">{fileName}</h4>
      {renderFile()}
    </div>
  );
};

export default FileViewer;
