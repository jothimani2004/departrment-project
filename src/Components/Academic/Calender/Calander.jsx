import "bootstrap/dist/css/bootstrap.min.css";
import style from "./calender.module.css"
import { useState, useEffect } from "react";




export default function Calander_show({keys:{pfd_path,title}}){

        const role = "Admin"

        const [showPopup, setShowPopup] = useState(false);

        function setting_pop_field(val){

            setShowPopup(true)
            console.log(val)
            // if (val.length != 0){
            
            // }else{
              
            // }
            // [patent.title,patent.applicationNumber,patent.grantNumber,patent.dateGranted,patent.patentee]
      
        }


        const handleSubmit = async (val,e) => {
            e.preventDefault(); // Prevent default form submission behavior
        
            console.log(val)
        
           
          }
        


  
    return (
        <>
         <div className="container py-4 s_b rounded-2 my-4" >
            <div className="content mt-3 px-3">
                 <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="h1"> {title}</h1>
                    <div>
                    {role =="Admin"?<button class="btn btn-primary mx-1 my-3 "
                        onClick={()=> setting_pop_field([])}
                        >Edit {title}</button>:null}
                    </div>
                </div>
                <div className="para ps-4">
                    <p className="fs-5">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta asperiores ipsum dolorem, reprehenderit quisquam placeat illo neque esse iure harum, quod fuga fugiat quibusdam. Officiis hic eius inventore perferendis quis!
                        Dolor earum adipisci placeat, deserunt aperiam corporis saepe nisi tempora ea sequi debitis consequatur? Eaque aut deserunt non aperiam perferendis fuga et aliquam tempora, eos nihil cumque cupiditate, illum itaque!
                    </p>
                </div>
            </div>

            <div className="pdf-container d-flex justify-content-center align-items-center py-3">
                <div className="card shadow-lg w-100 rounded-3" style={{ maxWidth: '90%' }}>
                    <iframe
                        src={pfd_path}
                        width="100%"
                        height="600px"
                        title="PDF Viewer"
                        className="rounded-3"
                    ></iframe>
                </div>
            </div>
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
                      name="profile_photo"
                      accept="file/*"
                    //   onChange={(e) => handleFileChange(e, "profile_photo")}
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
    )
} 