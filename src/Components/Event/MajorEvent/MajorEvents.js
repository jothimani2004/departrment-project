import React, { useState,useEffect } from "react";
import { Container, Row, Col, Card, Form ,Button } from "react-bootstrap";
import './MajorEvents.css';
import { events } from "../../../Content/Event";
import UseApiPost from "../../../Custom_hook/apiPostCall";
import UseApiGet from "../../../Custom_hook/apiGetCall";
import UseApiDelete from "../../../Custom_hook/apiDeleteCall";
import UseApiPut from "../../../Custom_hook/apiPutCall";
import { checkJwtCookie } from "../../Jwt_verify/checkJwtCookie.jsx";

const MajorEvents = () => {

  const role = checkJwtCookie({returnme:"role"})
  const [filter, setFilter] = useState("all");
  const [showPopup, setShowPopup] = useState(false);
  const [selectFile,setSelectFile] = useState(null)
  const [newVideo, setNewVideo] = useState({ videoId: "", title: "", location: "" ,date:"",time:"",abstract:""});
  const [editContent, setEditContent] = useState({ videoId: "", title: "", location: "" ,date:"",time:"",abstract:""});
  const [journals,setJournals] = useState([])
  const [file_require,setRequire] = useState(false)
  const [mimeType,setMimeType] = useState()
  let val; 
  


  useEffect(()=>{
  
    async function call(){

        val = await UseApiGet("/major_event");
        setJournals(val)
      }
    call()
    
    

    },[])
  

    
    function setting_pop_field(val){

      setShowPopup(true)
        
      if (val.length != 0){
        setNewVideo({ videoId: val[5], title: val[0], location: val[1] ,date:val[2],time:val[3],abstract:val[4]} )
        setEditContent( { videoId: val[5], title: val[0], location: val[1] ,date:val[2],time:val[3],abstract:val[4]} )
        setRequire(false)
      }else{
        setRequire(true)
          setNewVideo({ videoId: "", title: "", location: "" ,date:"",time:"",abstract:""})
          setEditContent({ videoId: "", title: "", location: "" ,date:"",time:"",abstract:""})
        }
        // [journal.title,journal.location,journal.date,journal.time,journal.abstract,journal._id]
  }


   const handleFileChange = async(e) =>{
    const file = e.target.files[0]
    setSelectFile(file)
    console.log(file)
        
      }
  

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        
    
        setEditContent((preContent) => ({
          ...preContent,
          [name]: value,
        }));
    
    
      };
      
      const handleSubmit = async (e) => {
          e.preventDefault(); // Prevent default form submission behavior
          const formData = new FormData();

          if (!selectFile) {
          
            formData.append("data",JSON.stringify(editContent))
            console.log("not selected")
          }else{
            formData.append("file",selectFile)
            console.log(editContent, "check")
            formData.append("data",JSON.stringify(editContent))
            console.log("selected")

          }

          if (editContent.videoId === ""){
            const result  = await UseApiPost({path:"/major_event",body:formData})
          }else{
            const result  = await UseApiPut({path:"/major_event",body:formData})
          }
        
        
          // console.log(editContent)
          
          window.location.reload()
          
        }


         const handleDelete = async (jol,object_id,e) => {
        
            const confirmDelete = window.confirm(`Do you want to delete this journal: ${jol}`);
            if (confirmDelete) {

              
              console.log(object_id)
              const result = await UseApiDelete({path:"/major_event",body:{object:object_id}})
                console.log(result)
        
        
            }
            window.location.reload()
          };


  

  // Filter events based on the selected filter
  const filteredEvents = filter === "all" ? events : events.filter(event => event.status === filter);

  return (<>

    <Container className="mt-5 mb-5  pt-4">
          
          <div className="d-flex justify-content-between align-items-center mb-4 w-100 px-5">

          <h1 className="h1 text-center"> Upcomming Events</h1>
            <div>
            {role =="Admin"?<button class="btn btn-primary mx-1 my-3 "
                onClick={()=> setting_pop_field([])}
                >Add New Events </button>:null}
            </div>
          </div>


      <Row xs={1} sm={2} md={2} className="g-5">

        {
        journals.length >0?

        journals.map((journal, index) => (

          <Col key={index}>
            <Card className="event-card  pt-0">
              
    
            <img
                src={`data:${journal.file.mimetype};base64,${journal.file.buffer}`}
                alt="Event Image"
                className="event-image"
            />

              <Card.Body className="s_b t_c rounded-bottom-3">
                <Card.Title className="event-title">{journal.data.title}</Card.Title>
                <Card.Text className="event-description">
                  {journal.data.abstract}
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">
                    Date: {journal.data.date} | Location: {journal.data.location} | Time: {journal.data.time}
                  </small>
                </Card.Text>

                {role =="Admin"?<button class="btn btn-primary mx-1"
                  id ={`ej_${index}`}
                onClick={()=> setting_pop_field([journal.data.title,journal.data.location,journal.data.date,journal.data.time,journal.data.abstract,journal._id])}
                >Edit</button>:null}

                {role =="Admin"?<button class="btn btn-danger mx-1"
                onClick={(e)=>handleDelete(journal.data.title,journal._id,e)}
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
              <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="modal-body">

                <div className="form-group">
                    <label>Event Title*</label>
                    <input
                      type="text"
                      name="title"
                      value={editContent.title}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Location*</label>
                    <input
                      type="text"
                      name="location"
                      value={editContent.location}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date*</label>
                    <input
                      type="date"
                      name="date"
                      value={editContent.date}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Time*(Enter time with event range)</label>
                    <input
                      type="text"
                      name="time"
                      value={editContent.time}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Abstract</label>
                    <textarea
                      name="abstract"
                      value={editContent.abstract}
                      onChange={handleInputChange}
                      className="form-control"
                    ></textarea>
                  </div>
               
                <div className="form-group mb-3">
                    <label>Upload Photo (png, jpeg)*</label>
                  
                    <input
                      type="file"
                      name="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => handleFileChange(e)}
                      className="form-control"
                      required={file_require}
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
                  
                  <button type="submit" className="btn btn-primary" >
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

export default MajorEvents;
