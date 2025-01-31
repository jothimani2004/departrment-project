import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import './Patent.css'
import { useState, useEffect } from "react";
import UseApiPost from "../../../Custom_hook/apiPostCall";
import UseApiGet from "../../../Custom_hook/apiGetCall";
import UseApiDelete from "../../../Custom_hook/apiDeleteCall";
import UseApiPut from "../../../Custom_hook/apiPutCall";
import { checkJwtCookie } from "../../Jwt_verify/checkJwtCookie.jsx";


const Patents = () => {


  const role = checkJwtCookie({returnme:"role"})
    
      const [isTeacher, setIsTeacher] = useState(false);
      const [showPopup, setShowPopup] = useState(false);
      const [newVideo, setNewVideo] = useState({ videoId: "", title: "", applicationNumber: "" ,grantNumber:"",dateGranted:"",patentee:"",});
      const [editContent, setEditContent] = useState({ videoId: "", title: "", applicationNumber: "" ,grantNumber:"",dateGranted:"",patentee:"",});
      const [message, setMessage] = useState("");
      const [videos, setVideos] = useState([]);
      let val;
      const [patents,setPatents] = useState([])



    useEffect(()=>{
    
        async function call(){
    
            val = await UseApiGet("/patent");
            setPatents(val)
            console.log(val)
          }
        call()
        
    
        },[])





  function setting_pop_field(val){

  setShowPopup(true)

  console.log(val)
  if (val.length != 0){
  setNewVideo( { videoId: val[5], title: val[0], applicationNumber: val[1] ,grantNumber:val[2],dateGranted:val[3],patentee:val[4]} )
  setEditContent( { videoId: val[5], title: val[0], applicationNumber: val[1] ,grantNumber:val[2],dateGranted:val[3],patentee:val[4]} )

  }else{
    setNewVideo({ videoId: "", title: "", applicationNumber: "" ,grantNumber:"",dateGranted:"",patentee:"",} )
    setEditContent({ videoId: "", title: "", applicationNumber: "" ,grantNumber:"",dateGranted:"",patentee:"",} )

  }
  // [patent.title,patent.applicationNumber,patent.grantNumber,patent.dateGranted,patent.patentee]

  }

  const handleInputChange = (e) => {
  const { name, value } = e.target;
      setEditContent((prevVideo) => ({
        ...prevVideo,
        [name]: value,
      }));

    };

  const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

        if (editContent.videoId === ""){
          const result  = await UseApiPost({path:"/patent",body:editContent})
        }else{
          const result  = await UseApiPut({path:"/patent",body:editContent})
        }

  
  window.location.reload()

  }

  const handleDelete = async (jol,object_id,e) => {

    console.log(object_id)
    const confirmDelete = window.confirm(`Do you want to delete this conference:  ${jol}`);
    if (confirmDelete) {
       console.log(object_id)
        const result = await UseApiDelete({path:"/patent",body:{object:object_id}})
          console.log(result)
    }
    window.location.reload()
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
        {
        patents.length > 0 ?
        
        patents.map((patent, index) => (
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
                onClick={()=> setting_pop_field([patent.title,patent.applicationNumber,patent.grantNumber,patent.dateGranted,patent.patentee,patent._id])}
                >Edit</button>:null}

                {role =="Admin"?<button class="btn btn-danger mx-1"
                onClick={(e)=>handleDelete(patent.title,patent._id,e)}
                >
                      <i class="bi bi-trash"></i> Delete
                    </button>:null}


              </Card.Body>
            </Card>
          </Col>
        )):<Card.Body>
            <Card.Text>
              <h2 className="text-center" style={{color:"rgba(233, 48, 48, 0.89)"}}><strong>No Content found</strong></h2>
            </Card.Text>

        </Card.Body>}
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
                      value={editContent.title}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Application Number :</label>
                    <input
                      type="text"
                      name="applicationNumber"
                      value={editContent.applicationNumber}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Grant Number :</label>
                    <input
                      type="text"
                      name="grantNumber"
                      value={editContent.grantNumber}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date Granted :</label>
                    <input
                      type="text"
                      name="dateGranted"
                      value={editContent.dateGranted}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Patentee:</label>
                    <input
                      type="text"
                      name="patentee"
                      value={editContent.patentee}
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
                  
                  <button type="submit" className="btn btn-primary" onClick={(e)=>handleSubmit(e)}>
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
