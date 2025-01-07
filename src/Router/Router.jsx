import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {Home} 


export const Router_path = () =>{
    return (
        
        <div>
          {/* Define routes */}
          <Routes>
            <Route path="/" element={`<h1>gowtham</h1>`} />
          </Routes>
        </div>
 
    )
}