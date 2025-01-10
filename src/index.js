import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterPath } from "./Router/RouterPath.jsx";
import { BrowserRouter } from "react-router-dom";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { DomainProvider } from "./Components/Resource/domain/DomainContext.jsx";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DomainProvider>
    <BrowserRouter>
      <RouterPath />
    </BrowserRouter>
    </DomainProvider>
   
  </React.StrictMode>
);

reportWebVitals();
