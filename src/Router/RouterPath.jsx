import { Routes, Route } from "react-router-dom";
import Student_list from '../Components/People/Student/Student_list.jsx';
import Courses from '../Components/Academic/Courses/Courses_list.jsx'
import {Navbar} from '../Components/Home/Navbar/Navbar.jsx';
import {Home} from '../Components/Home/Home/Home.jsx';
import { Calander, Time_tables } from "../Content/Academic.js";
import Seperate_student from "../Components/People/Seperate_Student/Seperate_student.jsx";
import Seperate_student_Edit from "../Components/People/Seperate_Student_Edit/Seperate_student_Edit.jsx";
import Event_show from "../Components/Event/MajorEvent/Event_show.jsx";
import Event_Seperate_page from "../Components/Event/Seperate_event/Event_Seperate_page.jsx";
import  FacultyList from '../Components/People/Faculty/FacultyList.js';
import Journals from '../Components/Publication/Journal/Journals.js';
import Conferences from '../Components/Publication/Paper/Conferences.js';
import Patents from '../Components/Publication/Patent/Patent.js';
import { GlobalContextProvider } from "../Components/GlobalContext/globalContext.jsx";
import MajorEvents from '../Components/Event/MajorEvent/MajorEvents.js'
import {Footer} from '../Components/Home/Footer/Footer.jsx'
import Login from '../Components/authentication/login.js'
import About_us from "../Components/About_us/About_us.jsx";
import ResetPassword from '../Components/authentication/resetpassword.js'
import React, { useContext } from 'react';
import DomainRoute from '../Components/Resource/domain/DomainRoute.jsx';
import PdfViewer from '../Components/Resource/pdfview/PdfViewer.jsx';
import NoteViewer from '../Components/Resource/pdfview/NoteViewer.jsx';
import { DomainContext } from '../Components/Resource/domain/DomainContext.jsx'
import {ProtectedRoute} from '../Components/ProtectedRoute/ProtectedRoute.jsx'
import Admin_page from "../Components/Admin_page/Admin_page.jsx";
import { Contact } from "lucide-react";
import Calander_show from "../Components/Academic/Calender/Calander.jsx";
import StudentVerification from "../Components/Academic/Student_data_verification/StudentVerification.jsx";
import NotFound from "../Components/NotFound/NotFound.jsx";
export const RouterPath = () => {
  
  const domainnames = ["InternetOfThings", "CyberSecurity", "BlockchainTechnology"];
  const { domainDetails, resourses } = useContext(DomainContext);
  
  

  return (
    <>
    <div className="p_b ">
        <GlobalContextProvider>
      <Navbar/>
      </GlobalContextProvider>
      <Routes>

        {/* Admin page */}
        <Route path="/Admin_page/Edit" element={<Admin_page/>} />
       
        <Route path="/Academic/courses" element={<Courses />} />
        <Route path="/Academic/calander" element={ <Calander_show keys={Calander}/> } />
        <Route path="/Academic/Time_table" element={ <Calander_show keys={Time_tables}/> } />


     
        <Route path="/Event/Cocurrcular_events" element={ <Event_show title="Cocurricular Events"/> } />
        <Route path="/Event/Extra_Curricular_events" element={ <Event_show title="Extra Curricular Events"/> } />
        <Route path="/Event/Major_events/Event_detail" element={ <Event_Seperate_page title="Elan 2025"/> } />
        <Route path="/Event/Major_events" element={<MajorEvents />} />


        <Route path="/Publications/journals" element={<Journals />} />
        <Route path="/Publications/conferences" element={<Conferences />} />
        <Route path="/Publications/patents" element={<Patents />} />

        <Route path="/People/Students/Profile" element={ <Seperate_student title= "Profile"/> } />
        <Route path="/People/Faculty" element={ <FacultyList />} />
        <Route path="/People/Students" element={<Student_list />} />
        <Route path="/People/courses" element={<Courses />} />

        <Route path="/About_us" element={<About_us/>} />        
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/Academic/student-verification" element={<StudentVerification />} />
        <Route path="/People/Students/Profile/Edit" element={
          <ProtectedRoute>
              <Seperate_student_Edit />
          </ProtectedRoute> 
        } />


        <Route
          path="resourse/:domain"
          element={
            <DomainRoute 
              domainnames={domainnames} 
              domainDetails={domainDetails} 
            />
          }
        />

        {/* Domain + Resource Route */}
        <Route
          path="resourse/:domain/:resourse"
          element={
            <DomainRoute 
              resourses={resourses}
              domainnames={domainnames} 
              domainDetails={domainDetails} 
            />
          }
        />

        {/* Domain + Resource + Year Route */}
        <Route
          path="resourse/:domain/:resourse/:year"
          element={
            <DomainRoute 
              resourses={resourses}
              domainnames={domainnames} 
            />
          }
        />

        {/* PdfViewer Route with Query Params */}
        <Route
          path="resourse/:domain/:resourse/:year/pdf"
          element={<PdfViewer />}
        />


<Route
  path="resourse/:domain/:resourse/notesview"
  element={<NoteViewer />}
/>

<Route
  path="*"
  element={<NotFound />}
/>


      </Routes>
      <Footer/>
    </div>

    </>
  );
};

