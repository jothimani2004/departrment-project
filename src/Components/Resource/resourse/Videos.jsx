import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams } from 'react-router-dom';
import {checkJwtCookie} from '../../Jwt_verify/checkJwtCookie';

const VideoComponent = () => {

  
  const d= process.env.REACT_APP_API_URL;

    const { domain } = useParams();

  const [isTeacher, setIsTeacher] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newVideo, setNewVideo] = useState({ videoId: "", title: "", description: "" });
  const [message, setMessage] = useState("");
  const [videos, setVideos] = useState([]);

  // Fetch videos and user role (teacher or student)
  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${d}/videos`, {
        params: { domain: domain }
      });
      setVideos(response.data.videos);
      
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
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
    setNewVideo((prevVideo) => ({
      ...prevVideo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!newVideo.videoId || !newVideo.title || !newVideo.description) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const cookieValue = "2020202002";
      await axios.post(`${d}/addvideo`, { newVideo,domain, cookieValue });
      setMessage("Video added successfully");
      setNewVideo({ videoId: "", title: "", description: "" });
      setShowPopup(false); // Close the popup after successful submission
      fetchVideos(); // Fetch updated video list after adding
    } catch (error) {
      console.error("Error adding video:", error);
      setMessage("Error adding video");
    }
  };

  const handleDelete = async (videoid,title) => {
  
    try {
           const confirmDelete = window.confirm(`Do you want to delete this title: ${title}`);
                  if (confirmDelete) {
      
                    await axios.delete(`${d}/videodelete/${videoid}`);
                    setMessage("Video deleted successfully");
                    fetchVideos(); // Fetch updated video list after deletion
              
                  }
     
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div className="container m-2">
       <h1 className="font-bold my-4 text-center">{domain }</h1> {/* Display domain */}
      <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3"> videos Resources</h1>
              <div>
                 {/* Teacher can add links */}
              {isTeacher && (
                <motion.button
                  onClick={() => setShowPopup(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary"
                >
                  Add New video
                </motion.button>
              )}
              
              </div>
            </div>
            

            {videos.length === 0 ? (
  <div className="text-center text-muted">
    <h5>No videos available</h5>
  </div>
) : (
            <div className="row g-4">
  {videos.map((video) => (
    <div key={video.videoid} className="col-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card shadow rounded-3 border"
      >
        <div className="ratio ratio-16x9">
          <iframe
            src={`https://www.youtube.com/embed/${video.videoid}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
            className="rounded-top"
          ></iframe>
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{video.Video.title}</h5>
          <p className="card-text">{video.Video.description}</p>
          {isTeacher && (
            <motion.button
              onClick={() => handleDelete(video._id,video.Video.title)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-danger ml-1"
            >
              Delete
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  ))}
</div>
)}


      {/* Bootstrap Modal for Adding New Video */}
      {showPopup && (
         <motion.div
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
                >
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Video</h5>
                
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>YouTube Video Link</label>
                    <input
                      type="text"
                      name="videoId"
                      value={newVideo.videoId}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newVideo.title}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={newVideo.description}
                      onChange={handleInputChange}
                      className="form-control"
                    ></textarea>
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

        </motion.div>
      )}

      {message && <p className="text-center text-success mt-3">{message}</p>}
    </div>
  );
};

export default VideoComponent;
