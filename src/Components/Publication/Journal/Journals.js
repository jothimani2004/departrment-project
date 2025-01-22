import React from "react";
import { Card, Container } from "react-bootstrap";
import './Journal.css';
import { useState, useEffect } from "react";
import { journals } from "../../../Content/publication";
import axios from "axios";


const Journals = () => {

  const role = "Admin"

  const [isTeacher, setIsTeacher] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [newVideo, setNewVideo] = useState({ videoId: "", title: "", authors: "" ,journal:"",volume:"",year:"",index:"",abstract:""});
   const [message, setMessage] = useState("");
   const [videos, setVideos] = useState([]);


  function setting_pop_field(val){

      setShowPopup(true)
      console.log(val)

      setNewVideo( { videoId: "", title: val[0], authors: val[1] ,journal:val[2],volume:val[3],year:val[4],index:val[5],abstract:val[6]} )

      // [journal.title,journal.authors,journal.journal,journal.volume,journal.year,journal.index,journal.abstract]

  }










   const fetchVideos = async () => {
    try {
      const response = await axios.get("/videos");
      setVideos(response.data.videos);
      
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);


   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo((prevVideo) => ({
      ...prevVideo,
      [name]: value,
    }));
  };

   const handleSubmit = async (val,e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // if (!newVideo.videoId || !newVideo.title || !newVideo.description) {
    //   setMessage("All fields are required.");
    //   return;
    // }
    console.log(val)

    try {
      const cookieValue = "2020202002";
      await axios.post("/addvideo", { newVideo, cookieValue });
      setMessage("Video added successfully");
      setNewVideo({ videoId: "", title: "", description: "" });
      setShowPopup(false); // Close the popup after successful submission
      fetchVideos(); // Fetch updated video list after adding
    } catch (error) {
      console.error("Error adding video:", error);
      setMessage("Error adding video");
    }
  }

  const handleDelete = async (jol,object_id,e) => {

    alert(`Do you want to delete this journal: ${jol}`)

    console.log(object_id)


    // try {
    //   await axios.delete(`/videodelete/${videoid}`);
    //   setMessage("Video deleted successfully");
    //   fetchVideos(); // Fetch updated video list after deletion
    // } catch (error) {
    //   console.error("Error deleting video:", error);
    // }
  };


  return (<>
    <Container className="mt-0 pt-4 border-0">
      <h2 className="mb-4 text-center">Journals</h2>
      {journals.map((journal, index) => (
        <Card
          key={index}
          className="journal-card mb-5 shadow pt-0 border-0"
          id = {`j_${index}`}
          style={{
            animationDelay: `${index * 0.3}s`,
          }}
        >
          <Card.Body className="s_b rounded-3 t_c">
            <Card.Title className="fw-bold">{journal.title}</Card.Title>
            <Card.Text>
              <strong>Authors:</strong> {journal.authors}
            </Card.Text>
            <Card.Text>
              <strong>Journal:</strong> {journal.journal}
            </Card.Text>
            <Card.Text>
              <strong>Volume:</strong> {journal.volume}
            </Card.Text>
            <Card.Text>
              <strong>Pages:</strong> {journal.pages}
            </Card.Text>
            <Card.Text>
              <strong>Year:</strong> {journal.year}
            </Card.Text>
            <Card.Text>
              <strong>Index:</strong> {journal.index}
            </Card.Text>
            <Card.Text>
              <strong>Abstract:</strong> {journal.abstract}
            </Card.Text>
            {role =="Admin"?<button class="btn btn-primary mx-1"
              id ={`ej_${index}`}
            onClick={()=> setting_pop_field([journal.title,journal.authors,journal.journal,journal.volume,journal.year,journal.index,journal.abstract])}
            >Edit</button>:null}

            {role =="Admin"?<button class="btn btn-danger mx-1"
            onClick={(e)=>handleDelete(journal.journal,"object_id",e)}
            >
                  <i class="bi bi-trash"></i> Delete
                </button>:null}





          </Card.Body>
        </Card>
      ))}
    </Container>

    {showPopup && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Detail</h5>
                
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
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
                    <label>Author</label>
                    <input
                      type="text"
                      name="Author"
                      value={newVideo.authors}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Journal</label>
                    <input
                      type="text"
                      name="Journal"
                      value={newVideo.journal}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Volume</label>
                    <input
                      type="text"
                      name="Volume"
                      value={newVideo.volume}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Year</label>
                    <input
                      type="text"
                      name="Year"
                      value={newVideo.year}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Abstract</label>
                    <textarea
                      name="Abstract"
                      value={newVideo.abstract}
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
                  
                  <button type="submit" className="btn btn-primary" onClick={(e)=>handleSubmit("object_id",e)}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Journals;
