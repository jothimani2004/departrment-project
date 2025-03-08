import { useEffect, useState } from "react"
import style from "./Seperate_student.module.css"
import { Spinner } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import UseApiGet from "../../../Custom_hook/apiGetCall";


export default function Seperate_student({title}){

    const [searchParams] = useSearchParams();
    const userId = searchParams.get("register_no");
    const [studentDetail,setStudentDetail] = useState({})
    console.log(userId)
   
    

    useEffect(()=>{
       async function call() {
        const result = await UseApiGet(`/user_detail?reg_no=${userId}`)
        setStudentDetail(result[0])
       }
       call()

    },[])







    return (
        <>
         <div className={style.con}>

                 <h1>{title}</h1>
            <div className={style.content}>
                 
                <h2>Summary</h2>
                 <div className={style.para}>
                    <div>

                    <p>{studentDetail.profile_desc}</p>
                    <div className={style.option}>
                        <a href={studentDetail.linkedin_link}>
                            <li>
                                <img src="/images/student_seperate_page/linked_in.png" alt="linkedin" height="10px" /> Linked in
                            </li>
                        </a>
                        <a href={studentDetail.github_link}>
                            <li>
                                <img src="/images/student_seperate_page/github.png" alt="github" height="10px" />Github
                            </li>
                        </a>
                        <a href={`mailto:${studentDetail.email}`}>
                            <li>
                                <img src="/images/student_seperate_page/mail.png" alt="mail" height="10px" /> Gmail
                            </li>
                        </a>
                        <a href={studentDetail.leetcode_link}>
                            <li>
                                <img src="/images/student_seperate_page/leetcode.png" alt="leetcode" height="10px" />  Leet code
                            </li>
                        </a>
                       
                     </div>
                    </div>
                    <div className={style.image_cover}>

                        <div className={style.image}>
                            <div className={style.image_size}>
                                {studentDetail.profile_photo ? (
                                    <img src={`data:image/jpeg;base64,${studentDetail.profile_photo}`} alt="Fetched Image" width="100%"
                                    height="100%"
                                    style={{ borderRadius: '10px' }} />
                                ) : (
                                   <h5>upload your photo !</h5>
                                )}
                            </div>

                        </div>
                    </div>
                 </div>

                 
            </div>

            <div className={style.line}></div>
            
            <div className={style.pdf_container}>
                <h1>Resume</h1>

                <div className={style.card_size}>
                <div className="pdf-container d-flex justify-content-center align-items-center py-3">
              <div className="card shadow-lg w-100 rounded-3">
                {studentDetail.resume ? <iframe
                      src={`data:application/pdf;base64,${studentDetail.resume}`}
                      title={title}
                      className="rounded-3"
                  ></iframe>:
                  <div className="text-center text-muted p-5">
                  <h5>No resume available.</h5>
                </div>
                  }

              </div>
                </div>
</div>
            </div>


        </div>

        </>
    )
}