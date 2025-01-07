import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



export const Router = () =>{
    return (
        <Router>
        <div>
          {/* Define routes */}
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    )
}