import React from "react";
import { Card, Container } from "react-bootstrap";
import './Conference.css';
import { useState, useEffect } from "react";
import UseApiPost from "../../../Custom_hook/apiPostCall";
import UseApiGet from "../../../Custom_hook/apiGetCall";
import UseApiDelete from "../../../Custom_hook/apiDeleteCall";
import UseApiPut from "../../../Custom_hook/apiPutCall";

const Conferences = () => {
 

  const role = "Admin"

  const [isTeacher, setIsTeacher] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newVideo, setNewVideo] = useState({ videoId: "", title: "", authors: "" ,conference:"",location:"",year:"",index:"",abstract:""});
  const [editContent, setEditContent] = useState({ videoId: "", title: "", authors: "" ,conference:"",location:"",year:"",index:"",abstract:""});
  const [message, setMessage] = useState("");
  const [videos, setVideos] = useState([]);
  let val;
  const [conferences,setConferences] = useState([])



  useEffect(()=>{
  
      async function call(){
  
          val = await UseApiGet("/paper");
          setConferences(val)
          console.log(val)
        }
      call()
      
  
      },[])



  function setting_pop_field(val){

      setShowPopup(true)
      // console.log(val)

     
      if (val.length != 0){
        setNewVideo( { videoId: val[6], title: val[0], authors: val[1] ,conference:val[2],location:val[3],year:val[4],doi:val[5]} )
        setEditContent( { videoId: val[6], title: val[0], authors: val[1] ,conference:val[2],location:val[3],year:val[4],doi:val[5]} )

      }else{

          setNewVideo({ videoId: "", title: "", authors: "" ,conference:"",location:"",year:"",doi:""} )
          setEditContent({ videoId: "", title: "", authors: "" ,conference:"",location:"",year:"",doi:""} )

        }

      // [conference.title,conference.authors,conference.conference,conference.location,conference.year,conference.pages,conference.dio]

  }

 

   const handleInputChange = (e) => {
    const { name, value } = e.target;


    setEditContent((prevVideo) => ({
      ...prevVideo,
      [name]: value,
    }));
    console.log(editContent)
  };



   const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (editContent.videoId === ""){
          const result  = await UseApiPost({path:"/paper",body:editContent})
        }else{
          const result  = await UseApiPut({path:"/paper",body:editContent})
        }

    console.log(editContent.videoId)

   window.location.reload()
  }

  const handleDelete = async (jol,object_id,e) => {

    console.log(object_id)
    const confirmDelete = window.confirm(`Do you want to delete this conference:  ${jol}`);

    if (confirmDelete) {
     console.log(object_id)
         const result = await UseApiDelete({path:"/paper",body:{object:object_id}})
           console.log(result)
      
    }
    window.location.reload()

   
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
    
      
      {
      conferences.length > 0 ?
      
      conferences.map((conference, index) => (
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
            onClick={()=> setting_pop_field([conference.title,conference.authors,conference.conference,conference.location,conference.year,conference.doi,conference._id])}
            >Edit</button>:null}

            {role =="Admin"?<button class="btn btn-danger mx-1"
            onClick={(e)=>handleDelete(conference.title,conference._id,e)}
            >
                  <i class="bi bi-trash"></i> Delete
                </button>:null}


          </Card.Body>
        </Card>
      )):<Card.Body>
      
      
                 <Card.Text>
                    <h2 className="text-center" style={{color:"rgba(233, 48, 48, 0.89)"}}><strong>No Content found</strong></h2>
                  </Card.Text>
      
              </Card.Body>
      }
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
                    <label>Author :</label>
                    <input
                      type="text"
                      name="authors"
                      value={editContent.authors}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Conference :</label>
                    <input
                      type="text"
                      name="conference"
                      value={editContent.conference}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Location :</label>
                    <input
                      type="text"
                      name="location"
                      value={editContent.location}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Year :</label>
                    <input
                      type="text"
                      name="year"
                      value={editContent.year}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>DOI :</label>
                    <input
                      type="text"
                      name="doi"
                      value={editContent.doi }
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

export default Conferences;
