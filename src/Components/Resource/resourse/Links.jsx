import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

const LinkComponent = () => {
  const [links, setLinks] = useState([]);
  const [isTeacher, setIsTeacher] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newLink, setNewLink] = useState({ name: "", url: "", description: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the links and user role (teacher/student)
    const fetchLinks = async () => {
      try {
        const response = await axios.get("/links");
        setLinks(response.data.links);
        setIsTeacher(response.data.isTeacher);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchLinks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLink((prevLink) => ({
      ...prevLink,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if fields are filled
    if (!newLink.name || !newLink.url || !newLink.description) {
      setMessage("All fields are required.");
      return;
    }
  
    try {
      const cookieValue = "2020202002"; // Simulated cookie value
      const response = await axios.post("/addlink", {
        newLink,
        cookieValue
      });

      // Add the new link to the existing list
      setLinks([...links, response.data.newLink]);
      
      // Close popup and reset form
      setShowPopup(false);
      setMessage("Link added successfully");
      setNewLink({ name: "", url: "", description: "" });
    } catch (error) {
      console.error("Error adding link:", error);
      setMessage("Error adding link.");
    }
  };

  const handleDelete = async (linktitle) => {
    try {
      const response = await axios.delete(`/deletelinks/${encodeURIComponent(linktitle)}`);
      setLinks(links.filter((link) => link.linktitle !== linktitle)); // Match the correct property name
      setMessage(response.data.message || "Link deleted successfully");
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  return (
    <div className="container m-2 ">
      <div className="flex justify-content-between align-items-center">
        <h1 className="xl:text-3xl font-bold mb-6 text-start text-gray-800">Links Resources</h1>

        {/* Teacher can add links */}
        {true && (
          <motion.button
            onClick={() => setShowPopup(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            Add New Link
          </motion.button>
        )}
      </div>

      <ul>
        {links.map((link) => (
          <li key={link.name} className="my-4 p-4 bg-white shadow rounded-lg">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="font-weight-bold">{link.linktitle}</h3>
              <button
                onClick={() => handleDelete(link.linktitle)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
            <p className="mt-2">{link.linkdesc}</p>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              <button className="btn btn-link">Get Link</button>
            </a>
            <p className="text-muted">Uploaded by: {link.uploaded_by}</p>
          </li>
        ))}
      </ul>

      {/* Popup form for adding new link */}
      {showPopup && (
        <div className="modal fade show d-block" tabIndex="-1"  role="dialog"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Link</h5>

               
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Link Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newLink.title}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>URL</label>
                    <input
                      type="text"
                      name="url"
                      value={newLink.url}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={newLink.description}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>

                {message && <p className="text-danger text-center mt-4">{message}</p>}


              </form>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default LinkComponent;
