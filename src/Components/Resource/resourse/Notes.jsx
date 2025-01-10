import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import NoteViewer from "../pdfview/NoteViewer";
import { useParams, useNavigate, Link } from 'react-router-dom';

const Documents = () => {
  const [notes, setNotes] = useState([]);
  const [isTeacher, setIsTeacher] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);// For modal visibility
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch notes and user role (teacher/student)
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
      window.location.reload(); // Close modal after successful upload
    } catch (error) {
      console.error("Error uploading note:", error);
      setMessage("Error uploading note");
    }
  };

  const handleNoteClick = async (notes_title) => {
    try {
      console.log(notes_title);
      // Use navigate to go to the /notes route with a query parameter
      navigate(`/notes?title=${encodeURIComponent(notes_title)}`);
    } catch (error) {
      console.error("Error fetching the note:", error);
    }
  };
  

  const handleDelete = async (notes_title) => {
    try {
     
      console.log(notes_title);
      const response = await axios.delete(`/delete/notes/${encodeURIComponent(notes_title)}`);      
      setMessage(response.data.message || "Note deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting the note:", error);
    }
    
  };

  // Toggle the modal open/close
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="w-full m-2">
<div className="flex justify-between items-center mt-8 xl:mt-0 mb-3">
      <h1 className="xl:text-3xl font-bold mb-6 text-start text-gray-800">Notes</h1>
            {/* Upload Button for Teachers */}
            {true && (
       <div className="text-sm xl:mb-4">
       <motion.button
         onClick={() => toggleModal(true)}
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600"
       >
         upload new notes
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
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleNoteClick(note.notes_title)}
            >
              View Note
            </button>
            {true && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                onClick={() => handleDelete(note.notes_title)}
              >
                Delete Note
              </button>
            )}
          </li>
        ))}
      </ul>



      {/* Modal for Uploading Notes */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold mb-4">Upload New Note</h2>
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block mb-1 font-semibold">Title</label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Description</label>
                  <textarea
                    className="border p-2 w-full"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <label className="block mb-1 font-semibold">File</label>
                  <input type="file" onChange={handleFileChange} />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Display message */}
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default Documents;
