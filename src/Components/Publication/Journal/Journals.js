import React from "react";
import { Card, Container } from "react-bootstrap";
import './Journal.css';
import { useState, useEffect } from "react";
// import { journals } from "../../../Content/publication";
import UseApiPost from "../../../Custom_hook/apiPostCall";
import UseApiGet from "../../../Custom_hook/apiGetCall";
import UseApiDelete from "../../../Custom_hook/apiDeleteCall";
import UseApiPut from "../../../Custom_hook/apiPutCall";

const Journals = () => {

  const role = "Admin"

  const [isTeacher, setIsTeacher] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newVideo, setNewVideo] = useState({ videoId: "", title: "", authors: "" ,journal:"",volume:"",year:"",index:"",abstract:""});
  const [editContent, setEditContent] = useState({ videoId: "", title: "", authors: "" ,journal:"",volume:"",year:"",index:"",abstract:""});
  const [message, setMessage] = useState("");
  const [videos, setVideos] = useState([]);
  let val;
  const [journals,setJournals] = useState([])



    useEffect(()=>{

    async function call(){

        val = await UseApiGet("/journal");
        setJournals(val)
      }
    call()
    

    },[])




  function setting_pop_field(val){

      setShowPopup(true)
      console.log(val)
      
      if (val.length != 0){
        setNewVideo( { videoId: val[7], title: val[0], authors: val[1] ,journal:val[2],volume:val[3],year:val[4],index:val[5],abstract:val[6]} )
        setEditContent( { videoId: val[7], title: val[0], authors: val[1] ,journal:val[2],volume:val[3],year:val[4],index:val[5],abstract:val[6]} )
      }else{
          setNewVideo({ videoId: "", title: "", authors: "" ,journal:"",volume:"",year:"",index:"",abstract:""})
          setEditContent({ videoId: "", title: "", authors: "" ,journal:"",volume:"",year:"",index:"",abstract:""} )
        }

      // [journal.title,journal.authors,journal.journal,journal.volume,journal.year,journal.index,journal.abstract]

  }





   const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditContent((preContent) => ({
      ...preContent,
      [name]: value,
    }));

    console.log(journals)

  };

   const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    if (editContent.videoId === ""){
      const result  = await UseApiPost({path:"/journal",body:editContent})
    }else{
      const result  = await UseApiPut({path:"/journal",body:editContent})
    }

    
    window.location.reload()
  
  }

  const handleDelete = async (jol,object_id,e) => {

    const confirmDelete = window.confirm(`Do you want to delete this journal: ${jol}`);
    if (confirmDelete) {

    console.log(object_id)
    const result = await UseApiDelete({path:"/journal",body:{object:object_id}})
      console.log(result)

    }
    window.location.reload()
  };




  return (<>
    <Container className="mt-0 pt-4 border-0">
    <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h1"> Journals</h1>
        <div>
        {role =="Admin"?<button class="btn btn-primary mx-1 my-3 "
            onClick={()=> setting_pop_field([])}
            >Add New Journals</button>:null}
        </div>
      </div>
    
      {
      journals.length > 0 ?

      journals.map((journal, index) => (
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
            onClick={()=> setting_pop_field([journal.title,journal.authors,journal.journal,journal.volume,journal.year,journal.index,journal.abstract,journal._id])}
            >Edit</button>:null}

            {role =="Admin"?<button class="btn btn-danger mx-1"
            onClick={(e)=>handleDelete(journal.title,journal._id,e)}
            >
                  <i class="bi bi-trash"></i> Delete
                </button>:null}





          </Card.Body>
        </Card>
      )):<Card.Body>


           <Card.Text>
              <h2 className="text-center" style={{color:"rgba(233, 48, 48, 0.89)"}}><strong>No Content found</strong></h2>
            </Card.Text>

        </Card.Body>}
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
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editContent.title}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Author</label>
                    <input
                      type="text"
                      name="authors"
                      value={editContent.authors}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Journal</label>
                    <input
                      type="text"
                      name="journal"
                      value={editContent.journal}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Volume</label>
                    <input
                      type="text"
                      name="volume"
                      value={editContent.volume}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Year</label>
                    <input
                      type="text"
                      name="year"
                      value={editContent.year}
                      onChange={handleInputChange}
                      className="form-control"
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

export default Journals;
