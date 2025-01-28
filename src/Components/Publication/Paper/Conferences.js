import React from "react";
import { Card, Container } from "react-bootstrap";
import './Conference.css';
import { journals, conferences } from "../../../Content/publication";
import { useState, useEffect } from "react";
import axios from "axios";


const Conferences = () => {
 

  const role = "Admin"

  const [isTeacher, setIsTeacher] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [newVideo, setNewVideo] = useState({ videoId: "", title: "", authors: "" ,conference:"",location:"",year:"",index:"",abstract:""});
   const [message, setMessage] = useState("");
   const [videos, setVideos] = useState([]);


  function setting_pop_field(val){

      setShowPopup(true)
      console.log(val)

     
      if (val.length != 0){
        setNewVideo( { videoId: "", title: val[0], authors: val[1] ,conference:val[2],location:val[3],year:val[4],dio:val[5]} )
      }else{
          setNewVideo({ videoId: "", title: "", authors: "" ,conference:"",location:"",year:"",index:"",abstract:""} )
        }

      // [conference.title,conference.authors,conference.conference,conference.location,conference.year,conference.pages,conference.dio]

  }




  


   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo((prevVideo) => ({
      ...prevVideo,
      [name]: value,
    }));
  };

   const handleSubmit = async (val,e) => {
    e.preventDefault(); // Prevent default form submission behavior

    console.log(val)

   
  }

  const handleDelete = async (jol,object_id,e) => {

   
    const confirmDelete = window.confirm(`Do you want to delete this conference:  ${jol}`);
    if (confirmDelete) {
     
      
    }
   
  };


  return (<>
 
    <Container className="mt-0 pt-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h1"> Conferences</h1>
        <div>
        {role =="Admin"?<button class="btn btn-primary mx-1 my-3 "
            onClick={()=> setting_pop_field([])}
            >Add New Conferences</button>:null}
        </div>
      </div>
    
      
      {conferences.map((conference, index) => (
        <Card
          key={index}
          className="conference-card mb-5 shadow-lg pt-0  border-0"
          style={{
            animationDelay: `${index * 0.3}s`,
          }}
        >
          <Card.Body className="s_b t_c rounded-3">
            <Card.Title className="fw-bold">{conference.title}</Card.Title>
            <Card.Text>
              <strong>Authors:</strong> {conference.authors}
            </Card.Text>
            <Card.Text>
              <strong>Conference:</strong> {conference.conference}
            </Card.Text>
            {conference.location && (
              <Card.Text>
                <strong>Location:</strong> {conference.location}
              </Card.Text>
            )}
            <Card.Text>
              <strong>Year:</strong> {conference.year}
            </Card.Text>
            {conference.pages && (
              <Card.Text>
                <strong>Pages:</strong> {conference.pages}
              </Card.Text>
            )}
            {conference.doi && (
              <Card.Text style={{ color: '#495057' }}>
                <strong>DOI:  </strong>
                <a
                  href={`https://doi.org/${conference.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{  color: '#495057' }}
                >
                   {conference.doi}
                </a>


              </Card.Text>
            )}

            {role =="Admin"?<button class="btn btn-primary mx-1"
              id ={`ej_${index}`}
            onClick={()=> setting_pop_field([conference.title,conference.authors,conference.conference,conference.location,conference.year,conference.doi])}
            >Edit</button>:null}

            {role =="Admin"?<button class="btn btn-danger mx-1"
            onClick={(e)=>handleDelete(conference.title,"object_id",e)}
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
                <h5 className="modal-title">Enter Detail</h5>
                
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                <div className="form-group">
                    <label>Title :</label>
                    <input
                      type="text"
                      name="title"
                      value={newVideo.title}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Author :</label>
                    <input
                      type="text"
                      name="Author"
                      value={newVideo.authors}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Conference :</label>
                    <input
                      type="text"
                      name="Conference"
                      value={newVideo.conference}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Location :</label>
                    <input
                      type="text"
                      name="Location"
                      value={newVideo.location}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Year :</label>
                    <input
                      type="text"
                      name="Year"
                      value={newVideo.year}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>DOI :</label>
                    <input
                      type="text"
                      name="DOI"
                      value={newVideo.dio }
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

export default Conferences;
