import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Documents = () => {
  const [notes, setNotes] = useState([]);
  const [isTeacher, setIsTeacher] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("/notes");
        setNotes(response.data.notes);
        setIsTeacher(response.data.isTeacher);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title || !description) {
      setMessage("Please fill out all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post("/uploadnotes", formData, {
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

  const handleNoteClick = async (notes_title) => {
    try {
      navigate(`/notes?title=${encodeURIComponent(notes_title)}`);
    } catch (error) {
      console.error("Error fetching the note:", error);
    }
  };

  const handleDelete = async (notes_title) => {
    try {
      const response = await axios.delete(`/delete/notes/${encodeURIComponent(notes_title)}`);
      setMessage(response.data.message || "Note deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting the note:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="w-full m-2">
      <div className="flex justify-between items-center mt-8 xl:mt-0 mb-3">
        <h1 className="xl:text-3xl font-bold mb-6 text-start text-gray-800">Notes</h1>
        {true && (
          <div className="text-sm xl:mb-4">
            <motion.button
              onClick={() => toggleModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
            >
              Upload New Notes
            </motion.button>
          </div>
        )}
      </div>

      {/* List of Notes */}
      <ul>
        {notes.map((note) => (
          <li key={note.name} className="mb-4">
            <h3 className="font-bold">{note.notes_name}</h3>
            <p>{note.notes_desc}</p>
            <p>{note.notes_title}</p>
            <button
              className="btn btn-info"
              onClick={() => handleNoteClick(note.notes_title)}
            >
              View Note
            </button>
            {true && (
              <button
                className="btn btn-danger ml-2"
                onClick={() => handleDelete(note.notes_title)}
              >
                Delete Note
              </button>
            )}
          </li>
        ))}
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

     
    </div>
  );
};

export default Documents;
