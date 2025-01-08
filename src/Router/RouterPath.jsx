import { Routes, Route } from "react-router-dom";
import Student_list from '../Components/People/Student/Student_list.jsx';
import Courses from '../Components/Academic/Courses/Courses_list.jsx'
import {Navbar} from '../Components/Home/Navbar/Navbar.jsx';
import {Home} from '../Components/Home/Home/Home.jsx';
import  FacultyList from '../Components/People/Faculty/FacultyList.js';


import Journals from '../Components/Publication/Journal/Journals.js';
import Conferences from '../Components/Publication/Paper/Conferences.js';
import Patents from '../Components/Publication/Patent/Patent.js';


export const RouterPath = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
      
          <Route path="/Publications/journals" element={<Journals />} />
          <Route path="/Publications/conferences" element={<Conferences />} />
          <Route path="/Publications/patents" element={<Patents />} />
        
      <Route path="/Academic/Faculty" element={ <FacultyList />} />
        <Route path="/Academic/Student" element={<Student_list />} />
        <Route path="/Academic/courses" element={<Courses />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </div>
  );
};
