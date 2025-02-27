import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import { useParams } from 'react-router-dom';
import {checkJwtCookie} from '../../Jwt_verify/checkJwtCookie';




const LinkComponent = () => {

  const d= process.env.REACT_APP_API_URL;

  const { domain } = useParams();


  const [links, setLinks] = useState([]);
  const [isTeacher, setIsTeacher] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newLink, setNewLink] = useState({ name: "", url: "", description: "" });
  const [message, setMessage] = useState("");


  useEffect(() => {
    // Fetch the links and user role (teacher/student)
    const fetchLinks = async () => {
      try {
        const response = await axios.get(`${d}/links`, {
          params: { domain: domain }
        });
        setLinks(response.data.links);
        setIsTeacher(response.data.isTeacher);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchLinks();
  }, []);

//check admin

  useEffect(() => {
    const role = checkJwtCookie({ returnme: "role" });
    console.log(role);
  if(role === "Admin"){
  setIsTeacher(true);
  
  }
   })




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
      console.log(domain);
      
      const response = await axios.post(`${d}/addlink`, {
        newLink,
        domain,
        cookieValue
      });

      // Add the new link to the existing list
      setLinks([...links, response.data.newLink]);
      
      // Close popup and reset form
      setShowPopup(false);
      setMessage("Link added successfully");
      setNewLink({ name: "", url: "", description: "" });
      window.location.reload();
    } catch (error) {
      console.error("Error adding link:", error);
      setMessage("Error adding link.");
    }
  };

  const handleDelete = async (linkid) => {
    try {
      const response = await axios.delete(`${d}/deletelinks/${linkid}`);
      setLinks(links.filter((link) =>link._id !== linkid)); // Match the correct property name
      setMessage(response.data.message || "Link deleted successfully");
     
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  return (
    <div className="container m-2 ">
 <h1 className="font-bold my-4 text-center">{domain }</h1> {/* Display domain */}
<div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3"> Links Resources</h1>
        <div>
           {/* Teacher can add links */}
        {isTeacher && (
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
      </div>




      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {links.map((link) => (
          <li key={link.name} className="my-4 p-4 bg-white shadow rounded-lg">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="font-weight-bold">{link.link.name}</h3>
              {isTeacher && (
                 <button
                 onClick={() => handleDelete(link._id)}
                 className="btn btn-sm btn-danger"
               >
                 Delete
               </button>

              )}
             
            </div>
            <p className="mt-2">{link.link.description}</p>
            <a
              href={link.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              <button className="btn btn-link">Get Link</button>
            </a>
            
       
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
