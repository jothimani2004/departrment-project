import { Routes, Route } from "react-router-dom";
import {Navbar} from '../Components/Home/Navbar/Navbar.jsx';
import {Home} from '../Components/Home/Home/Home.jsx'
export const RouterPath = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};
