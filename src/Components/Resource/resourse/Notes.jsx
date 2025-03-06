import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NoteViewer from "../pdfview/NoteViewer";
import {checkJwtCookie} from '../../Jwt_verify/checkJwtCookie';
import { FaFilePdf, FaFileImage, FaFileWord, FaFileAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import AlertMessage from "./AlertMessage";


const Documents = () => {


  const d= process.env.REACT_APP_API_URL;


  const { domain } = useParams();


  const [notes, setNotes] = useState([]);
  const [isTeacher, setIsTeacher] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);  // Add loading state
  const navigate = useNavigate();
  const [expandedNote, setExpandedNote] = useState(null);
  const [messages, setMessages] = useState([]); // Changed to an array for multiple messages
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0); // New state to track the current message


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const cookieValue = "2020202002";
        const response = await axios.get(`${d}/notes`, {
          params: {
            cookieValue: cookieValue, // Send cookie value
            domain: domain,           // Send domain
          }
        });
        console.log(response.data);
        setNotes(response.data);  // Ensure notes is always an array
       
        setIsTeacher(response.data.isTeacher);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchNotes();
   

  }, []);
  useEffect(() => {
    if (messages.length > 0 && currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(currentMessageIndex + 1);
      }, 3000); // Delay of 3 seconds between each message

      return () => clearTimeout(timer);
    }
  }, [messages, currentMessageIndex]);
  

 console.log(isTeacher);

  
  

 useEffect(() => {
  const role = checkJwtCookie({ returnme: "role" });
  
  console.log(role);
if(role === "Admin"){
setIsTeacher(true);

}
 })
 

 //get icon of the file
 const getFileIcon = (fileName) => {
  const ext = fileName.split(".").pop().toLowerCase();
  if (["pdf"].includes(ext)) return <FaFilePdf size={30} className="text-danger " />;
  if (["png", "jpg", "jpeg", "gif"].includes(ext)) return <FaFileImage size={30} className="text-primary" />;
  if (["doc", "docx"].includes(ext)) return <FaFileWord size={30} className="text-info" />;
  return <FaFileAlt size={30}  className="text-secondary" />; // Default icon
};
//good fine name
const formatFileName = (fileName) => {
  const nameWithoutExt = fileName.split(".").slice(0, -1).join(".");
  return nameWithoutExt.length > 15 ? nameWithoutExt.substring(0, 12) + "..." : nameWithoutExt;
};


  const handleFileChange = (e) => {
    setFile(e.target.files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title || !description) {
      setMessage("Please fill out all fields and select a file.");
      return;
    }
    const cookieValue = "2020202002";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("domain", domain);
    formData.append("cookieValue", cookieValue);
    
  
    // Append all files to FormData
    Array.from(file).forEach((fileItem) => {
      formData.append("files", fileItem);
    });


    try {
   // Simulated cookie value

      const response = await axios.post(`${d}/uploadnotes`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message || "Upload successful");
      setFile(null);
      setTitle("");
      setDescription("");
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading note:", error);
      setMessage("Error uploading note");
    }
  };

  const handleFileClick = (fileName, id) => {
    navigate(`/resourse/${domain}/notes/notesview?title=${encodeURIComponent(fileName)}&id=${encodeURIComponent(id)}`);
  };

  const handleDelete = async (noteId,noteti, notes_title) => {
    try {
      const confirmDelete = window.confirm(`Do you want to delete this notes_title: ${noteti}${notes_title ? `, file name is ${notes_title}` : ''}`);
      if (confirmDelete) {
 
               
              const response = await axios.delete(`${d}/delete/notes/${noteId}/${encodeURIComponent(notes_title)}`);
              setMessage(response.data.message || "Note deleted successfully");
              window.location.reload();
             }
         
             // Update the messages state with a success message from the response
      setMessages(prevMessages => [
        ...prevMessages, 
        'notes deleted successfully.'
      ]);
      
    
    } catch (error) {
      console.error("Error deleting the note:", error);
    }
  };
  

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  const toggleDropdown = (index) => {
    setExpandedNote(expandedNote === index ? null : index);
  };


if (loading) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}



  return (
    <div className="container m-2">
 <h1 className="font-bold my-4 text-center">{domain }</h1> {/* Display domain */}
    <div className="d-flex justify-content-between align-items-center mb-4">
   
            <h1 className="h3"> Notes Resources</h1>
            <div className="d-flex justify-content-center ">
  {/* Teacher can add links */}
  {isTeacher && (
    <motion.button
      onClick={() => toggleModal(true)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="btn btn-primary btn-md py-2 px-4"
    >
       Add New Notes
    </motion.button>
  )}
</div>

          </div>
    
     {/* List of Notes */}
     <ul className="list-unstyled">
  {notes.notes.length > 0 ? (
    notes.notes.map((note, index) => (
      <li key={index} className="mb-4 p-3 border rounded shadow-lg">
   <div
  className="d-flex justify-content-between align-items-center p-3 "
  onClick={() => toggleDropdown(index)}
  style={{
    cursor: "pointer",
    transition: "background 0.3s ease",
  }}

>
  <h5 className="fw-semibold text-primary m-0">{note.noteDetails?.[0]?.title}</h5>

  <div className="d-flex align-items-center">
    {isTeacher && (
      <button
        className="btn btn-outline-danger btn-sm me-2"
        onClick={(e) => {
          e.stopPropagation(); // Prevent dropdown toggle on delete click
          handleDelete(note._id,note.noteDetails?.[0]?.title);
        }}
        aria-label="Delete Note"
      >
        🗑️ Remove
      </button>
    )}
<FontAwesomeIcon
  icon={faChevronDown}
  style={{
    transition: "transform 0.3s ease",
    transform: expandedNote === index ? "rotate(180deg)" : "rotate(0deg)",
    border: "2px solid #333", // Border color
    borderRadius:"50%",// Make it circular
    padding: "5px", // Space inside the border
    fontSize: "16px", // Adjust size
  }}
/>
  </div>
</div>

<p className="text-left">{note.noteDetails?.[1]?.description}</p>

      {/* File List (Dropdown) */}
      {expandedNote === index && (
  <div className="row mt-2">
    {note.noteDetails?.slice(2).map((file, fileIndex) => (
      <div key={fileIndex} className="col-12 ">
        <div className="card p-3 mb-3 shadow-sm border-2">
          <div className="d-flex justify-content-between align-items-center">
            {/* File icon & name */}
            <div className="d-flex align-items-center gap-2 flex-grow-1">
              <span className="fs-5">{getFileIcon(file.originalName)}</span>
              <div
                className=" "
                 // Adjust max-width as needed
                title={file.originalName}
              >
                {file.originalName.split(".").slice(0, -1).join(".")}
              </div>
            </div>

            {/* Delete Button (for teacher) */}
            {isTeacher && (
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(note._id,note.noteDetails?.[0]?.title, file.originalName)}
              >
                🗑️
              </button>
            )}
          </div>

          {/* File Open Button */}
          <button
            className="btn btn-primary btn-sm mt-2 w-100"
            onClick={() => handleFileClick(file.originalName, note._id)}
          >
            Open File
          </button>
        </div>
      </div>
    ))}
  </div>
)}


    </li>
    ))
  ) : (
    <div className="text-center text-muted">
    <h5>No Notes available</h5>
  </div>
  )}
</ul>


      {/* Modal for Uploading Notes */}
      {isModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          aria-labelledby="uploadNotesModal"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="uploadNotesModal">
                  Upload New Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={toggleModal}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpload} className="">
                  {/* Title Input */}
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter title"
                    />
                  </div>
                  {/* Description Input */}
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter description"
                      rows="4"
                    ></textarea>
                  </div>
                  {/* File Input */}
                  <div className="form-group">
                    <label>File</label>
                    <input
  type="file"
  className="form-control"
  multiple
  onChange={handleFileChange}
/>

                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" onClick={handleUpload}>
                  Upload
                </button>
              </div>

               {/* Display message */}
      {message && <p className="text-danger text-center mt-4">{message}</p>}

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

export default Documents;
