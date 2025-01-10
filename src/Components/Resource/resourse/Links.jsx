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
        console.log(response.data.links);
        setLinks(response.data.links);
        setIsTeacher(response.data.isTeacher);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchLinks();
  }, []);

  // Handle input changes in the popup form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLink((prevLink) => ({
      ...prevLink,
      [name]: value,
    }));
  };

  // Handle form submission to add a new link
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
  
  // Handle link deletion
  const handleDelete = async (linktitle) => {
    try {
      console.log(linktitle);
      // Pass linktitle in the URL
      const response = await axios.delete(`/deletelinks/${encodeURIComponent(linktitle)}`);
      setLinks(links.filter((link) => link.linktitle !== linktitle)); // Match the correct property name (linktitle)
      setMessage(response.data.message || "Link deleted successfully");
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };
  

  return (
    <div className="w-full">
   <div className="flex justify-between items-center">
    <h1 className="xl:text-3xl font-bold mb-6 text-start text-gray-800">Links Resources</h1>

    {/* Teacher can add videos */}
    {true && (
      <div className="text-sm xl:mb-4">
        <motion.button
          onClick={() => setShowPopup(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600"
        >
          Add New Links
        </motion.button>
      </div>
    )}
  </div>


      <ul>
  {links.map((link) => (
    <li key={link.name} className="my-20 p-4 bg-white shadow-xl rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-gray-900">{link.linktitle}</h3>
        <button
          onClick={() => handleDelete(link.linktitle)}
          className="text-red-500 hover:text-red-700 text-sm font-semibold"
        >
          Delete
        </button>
      </div>
      <p className="mt-2 text-gray-700">{link.linkdesc}</p>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
      >
        <button>Get Link</button>
      </a>
      
      <p className="text-sm text-gray-500">Uploaded by: {link.uploaded_by}</p>
    </li>
  ))}
</ul>




      {/* Popup form for adding new link */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Link</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Link Name</label>
                <input
                  type="text"
                  name="name"
                  value={newLink.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">URL</label>
                <input
                  type="text"
                  name="url"
                  value={newLink.url}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newLink.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default LinkComponent;
