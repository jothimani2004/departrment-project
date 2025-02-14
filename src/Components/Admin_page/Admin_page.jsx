import { useEffect, useState } from "react"
import { checkJwtCookie } from "../Jwt_verify/checkJwtCookie"
import { useNavigate } from "react-router-dom";


export default function(){

    const [role,setrole] = useState('')
    const navigate = useNavigate();

    useEffect(()=>{
        if(checkJwtCookie({returnme:"role"}) != "Admin"){
            navigate("/login")
        }
    },[])


    const edit_pages = [
        {
            "title":"Acadimic calander",
            "content": "Click to Change the acadimic calander pdf.",
            "link":"/Academic/calander"
        },
        {
            "title":"Acadimic time table",
            "content":  "Click to Change the time table pdf.",
            "link":"/Academic/Time_table"
        },
        {
            "title":"Journal Publication ",
            "content": "Click to update the journal.",
            "link":"/Publications/journals"
        },
        {
            "title":" Paper Publication",
            "content": "Click to update the paper.",
            "link":"/Publications/conferences"
        },
        {
            "title":"Patent Publication",
            "content": "Click to update the patent.",
            "link":"/Publications/patents"
        },
        {
            "title":"Major events",
            "content": "Edit Major events schedule.",
            "link":"/Event/Major_events"
        },
        {
            "title":"CoCurricular events",
            "content": "Edit CoCurricular events schedule.",
            "link":"/Event/Cocurrcular_events"
        },
        {
            "title":"Extra Curricular events",
            "content": "Edit Extra Curricular events schedule.",
            "link":"/Event/Extra_Curricular_events"
        }
    ]


    return (
        <>
        <div class="m-4">
                <h1 class="text-md-center">Admin page</h1>
            <div class="row">


                {
                    edit_pages.map((item,index)=>
                        <div class="col-sm-6  mt-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title fw-bolder">{item.title}</h5>
                                    <p class="card-text fw-bold">{item.content}</p>
                                    <a href={item.link} class="btn btn-primary" >Edit Page</a>
                                </div>
                            </div>
                        </div>
                    
                    )
                }
            

            
          

            </div>

        </div>
        
        </>
    )
}