import { Routes, Route } from "react-router-dom";
import Student_list from '../Components/People/Student/Student_list.jsx';
import Courses from '../Components/Academic/Courses/Courses_list.jsx'
import {Navbar} from '../Components/Home/Navbar/Navbar.jsx';
import {Home} from '../Components/Home/Home/Home.jsx';
import Calander_show from "../Components/Academic/Calender/Calander.jsx";
import { Calander, Time_tables } from "../Content/Academic.js";
import Seperate_student from "../Components/People/Seperate_Student/Seperate_student.jsx";


export const RouterPath = () => {

  return (
    <>
      <Navbar/>
    <div>
      <Routes>
        <Route path="/Student" element={<Student_list />} />
        <Route path="/Academic/courses" element={<Courses />} />
        <Route path="/Academic/calander" element={ <Calander_show keys={Calander}/> } />
        <Route path="/Academic/Time_table" element={ <Calander_show keys={Time_tables}/> } />
        <Route path="/People/Students/Profile" element={ <Seperate_student title= "Profile"/> } />
        <Route path="/" element={<Home />} />

      </Routes>
    </div>
    </>
  );
};
