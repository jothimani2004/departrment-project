import "bootstrap/dist/css/bootstrap.min.css";
import style from "./calender.module.css"
import { useState, useEffect } from "react";
import UseApiPost from "../../../Custom_hook/apiPostCall";
import UseApiPut from "../../../Custom_hook/apiPutCall";
import UseApiGet from "../../../Custom_hook/apiGetCall";
import { Spinner } from 'react-bootstrap';
import { checkJwtCookie } from "../../Jwt_verify/checkJwtCookie.jsx";
import "./Calender.css"
import { useLocation } from 'react-router-dom';

export default function Calander_show({keys:{pfd_path,title}}){
  


  const role = checkJwtCookie({ returnme: "role" }) || "Guest";  
  const location = useLocation();
        const [showPopup, setShowPopup] = useState(false);
        const [selectFile,setSelectFile] = useState(null)
        const [calander,setCalander] = useState(null)
        const [Location,setLocation] = useState(null)
        let val;

      


        useEffect(() => {
          async function call() {
            val = await UseApiGet(`/file_upload?title=${title}`);
            setLocation(location.pathname); // Set path from location
            console.log("Current Path:", location.pathname); // Log path
            setCalander(val.buffer);
          }
          call();
        }, []); // Add location.pathname as dependency



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

     
          const result = await UseApiPut({path:"/file_upload",body:formData})  
          
      
          window.location.reload()

        }
        

  
    return (
        <>
         <div className="container py-4 s_b rounded-2 my-4" >
            <div className="content mt-3 px-3">
                 <div className="d-flex justify-content-between align-items-center mb-4">
                 {Location == "/Academic/calander"?<p className="desc">
                  <h1 className="h1"> Academic Calender</h1>                    </p>:<p className="desc">
                  <h1 className="h1"> Time Table</h1>                    </p>
                    }
                    
                    <div>
                    {role =="Admin"?<button class="btn btn-primary mx-1 my-3 "
                        onClick={()=> setting_pop_field([])}
                        >Edit {title}</button>:null}
                    </div>
                </div>
                <div className="para">

                    {Location == "/Academic/calander"?<p className="desc">
                    Welcome to the cse(ICB) Academic Calendar section. This calendar provides an overview of the important academic events, holidays, and examination schedules for the current academic year. Students and faculty can download the official calendar by clicking the link below.
                    </p>:<p className="desc">
                    Welcome to the cse(ICB) Class Timetable section. This timetable outlines the weekly schedule of lectures, lab sessions, and other academic activities for various batches. Students can refer to this timetable to stay updated with their daily classes and timings.
                    </p>
                    }

                </div>
            </div>

            {
              calander?
          <div className="pdf-container d-flex justify-content-center align-items-center py-3">
              <div className="card shadow-lg w-100 rounded-3">
                  <iframe
                      src={`data:application/pdf;base64,${calander}`}
                      title={title}
                      className="rounded-3"
                  ></iframe>
              </div>


            </div>:<div className="pdf-container d-flex justify-content-center align-items-center py-3 rounded-3" style={{background:"#fff"}}>
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