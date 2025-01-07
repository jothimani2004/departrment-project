import { Routes, Route } from "react-router-dom";

import Student_list from '../Components/People/Student/Student_list.jsx';
import Courses from '../Components/Academic/Courses/Courses_list.jsx'
export const RouterPath = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>Testing</h1>} />
        <Route path="/Student" element={<Student_list />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </div>
  );
};
