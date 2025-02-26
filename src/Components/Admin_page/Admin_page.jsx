import { useEffect, useState } from "react"
import { checkJwtCookie } from "../Jwt_verify/checkJwtCookie"
import { useNavigate } from "react-router-dom";
import { edit_pages } from "../../Content/admin_page";

export default function(){

    const [role,setrole] = useState('')
    const navigate = useNavigate();

    useEffect(()=>{
        if(checkJwtCookie({returnme:"role"}) != "Admin"){
            navigate("/login")
        }
    },[])

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