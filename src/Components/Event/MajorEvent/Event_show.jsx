import style from "./Event_show.module.css"
import { useState, useEffect } from "react";


export default function Event_show({title}){


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
            

    return(
        <>
         <div className={style.pdf_container}>

            
         <div className="d-flex justify-content-between align-items-center mb-4 w-100 px-5">

                    <h1 className="h1"> {title}</h1>
                    <div>
                    {role =="Admin"?<button class="btn btn-primary mx-1 my-3 "
                        onClick={()=> setting_pop_field([])}
                        >Edit {title}</button>:null}
                    </div>
                </div>

                <div className={style.card_size}>
                <iframe src="/assets/HIRTHICK GOWTHAM 1.pdf" width="100%" height="1120px" title="PDF Viewer"></iframe>
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