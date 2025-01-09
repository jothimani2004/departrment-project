import { Routes, Route } from "react-router-dom";
import Student_list from '../Components/People/Student/Student_list.jsx';
import Courses from '../Components/Academic/Courses/Courses_list.jsx'
import {Navbar} from '../Components/Home/Navbar/Navbar.jsx';
import {Home} from '../Components/Home/Home/Home.jsx';
import {Footer} from '../Components/Home/Footer/Footer.jsx'

export const RouterPath = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/Student" element={<Student_list />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/" element={<Home />} />

      </Routes>
      <Footer/>
    </div>
  );
};
