import style from "./Event_show.module.css"
import { useState, useEffect } from "react";
import { Spinner } from 'react-bootstrap';
import UseApiPost from "../../../Custom_hook/apiPostCall";
import UseApiPut from "../../../Custom_hook/apiPutCall";
import UseApiGet from "../../../Custom_hook/apiGetCall";
import { checkJwtCookie } from "../../Jwt_verify/checkJwtCookie";

export default function Event_show({title}){


    const [role,setRole] = useState(checkJwtCookie({returnme:"role"})) 
    const [showPopup, setShowPopup] = useState(false);
    const [selectFile,setSelectFile] = useState(null)
    const [calander,setCalander] = useState(null)
    let val;


    useEffect(()=>{
       
    async function call(){

        val = await UseApiGet(`/file_upload?title=${title}`);
      

    setCalander(val.buffer);  
      }
    call()
    

    },[])



    
    function setting_pop_field(val){

        setShowPopup(true)
        console.log(val)
       
    }

    const handleFileChange = async(e) =>{
      const file = e.target.files[0]
      setSelectFile(file)
      console.log(file)
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        if (!selectFile) {
          alert("Please select a file first!");
          return;
        }
      
        const formData = new FormData();
        formData.append("file", selectFile); // Key should match backend
        formData.append("title",title)

        // console.log(formData.file)
        const result = await UseApiPut({path:"/file_upload",body:formData})  
        
        console.log(result)
        window.location.reload()
        
      }
            

    return(
        <>
         <div className={style.pdf_container}>

            
         <div className="d-flex justify-content-between align-items-center mb-4 w-100 px-5">

                    <h1 className="h1 text-center"> {title}</h1>
                    <div>
                    {role =="Admin"?<button class="btn btn-primary mx-1 my-3 "
                        onClick={()=> setting_pop_field([])}
                        >Edit {title}</button>:null}
                    </div>
                </div>
                      {calander?
                      <div className={style.card_size}>
                        <div className="pdf-container d-flex justify-content-center align-items-center py-3">
                        <div className="card shadow-lg w-100 rounded-3">
                      <iframe
                      src={`data:application/pdf;base64,${calander}`}
                      title={title}
                      className="rounded-3"
                  ></iframe>
                      </div>
                      </div>
                      </div>
                      :
                      <div className="pdf-container d-flex justify-content-center align-items-center py-3 rounded-3" style={{background:"#fff"}}>
              <h3 style={{color:"hsl(207, 51.40%, 43.50%)"}}> Fetching &nbsp;</h3>
              <Spinner animation="border" variant="primary" />
            </div>
                      }
                
            </div>



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
               
                <div className="form-group mb-3">
                    <label>Upload Pdf</label>
                  
                    <input
                      type="file"
                      name="file"
                      accept="file/*"
                      onChange={(e) => handleFileChange(e)}
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
    )
}