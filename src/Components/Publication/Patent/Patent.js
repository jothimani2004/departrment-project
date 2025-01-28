import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import './Patent.css'
import {  patents} from "../../../Content/publication";
import { useState, useEffect } from "react";
import axios from "axios";


const Patents = () => {


       const role = "Admin"
      
        const [isTeacher, setIsTeacher] = useState(false);
         const [showPopup, setShowPopup] = useState(false);
         const [newVideo, setNewVideo] = useState({ videoId: "", title: "", applicationNumber: "" ,grantNumber:"",dateGranted:"",patentee:"",});
         const [message, setMessage] = useState("");
         const [videos, setVideos] = useState([]);


         function setting_pop_field(val){

          setShowPopup(true)
          console.log(val)
          if (val.length != 0){
          setNewVideo( { videoId: "", title: val[0], applicationNumber: val[1] ,grantNumber:val[2],dateGranted:val[3],patentee:val[4]} )
          }else{
            setNewVideo({ videoId: "", title: "", applicationNumber: "" ,grantNumber:"",dateGranted:"",patentee:"",} )
          }
          // [patent.title,patent.applicationNumber,patent.grantNumber,patent.dateGranted,patent.patentee]
    
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
         
          console.log(confirmDelete)
        }
       
      };

      


  return (<>
    <Container className="mt-0 pt-4">

    <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h1"> Patents</h1>
        <div>
        {role =="Admin"?<button class="btn btn-primary mx-1 my-3 "
            onClick={()=> setting_pop_field([])}
            >Add New Patents</button>:null}
        </div>
      </div>

      <Row>
        {patents.map((patent, index) => (
          <Col key={index} xs={12}>
            <Card
              className="patent-card mb-4 border-0 rounded-lg overflow-hidden"
              style={{
                animationDelay: `${index * 0.3}s`,
              }}
              
              >
              <Card.Body className="s_b rounded-3">
                <Card.Title className="fw-bold text-dark">{patent.title}</Card.Title>
                <Card.Text>
                  <strong>Application Number:</strong> {patent.applicationNumber}
                </Card.Text>
                <Card.Text>
                  <strong>Grant Number:</strong> {patent.grantNumber}
                </Card.Text>
                <Card.Text>
                  <strong>Date Granted:</strong> {patent.dateGranted}
                </Card.Text>
                <Card.Text>
                  <strong>Patentee:</strong> {patent.patentee}
                </Card.Text>


                {role =="Admin"?<button class="btn btn-primary mx-1"
                  id ={`ej_${index}`}
                onClick={()=> setting_pop_field([patent.title,patent.applicationNumber,patent.grantNumber,patent.dateGranted,patent.patentee])}
                >Edit</button>:null}

                {role =="Admin"?<button class="btn btn-danger mx-1"
                onClick={(e)=>handleDelete(patent.title,"object_id",e)}
                >
                      <i class="bi bi-trash"></i> Delete
                    </button>:null}


              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
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
                    <label>Application Number :</label>
                    <input
                      type="text"
                      name="Application_Number"
                      value={newVideo.applicationNumber}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Grant Number :</label>
                    <input
                      type="text"
                      name="Grant_Number"
                      value={newVideo.grantNumber}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date Granted :</label>
                    <input
                      type="text"
                      name="Date_Granted"
                      value={newVideo.dateGranted}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Patentee:</label>
                    <input
                      type="text"
                      name="Patentee"
                      value={newVideo.patentee}
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

export default Patents;
