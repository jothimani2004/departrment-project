export const Footer = () =>{
    return (
        <footer className="bg-dark text-white py-4" id="Contact">
          <div className="container">
            <div className="row">

            <div className="col-md-4 mb-3">
                <h5>Events</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="/Event/Major_events" className="text-white text-decoration-none">
                      Major Events
                    </a>
                  </li>
                  
                  <li>
                    <a href="/Event/Cocurrcular_events" className="text-white text-decoration-none">
                    Cocurricular Events
                    </a>
                  </li>
                  <li>
                    <a href="/Event/Extra_Curricular_events" className="text-white text-decoration-none">
                    Extra Curricular Events
                    </a>
                  </li>
                </ul>
                <h5>People</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="/People/Students" className="text-white text-decoration-none">
                      Students
                    </a>
                  </li>
                  
                  <li>
                    <a href="/People/Faculty" className="text-white text-decoration-none">
                      Faculty
                    </a>
                  </li>
                  <li>
                    <a href="#Contact" className="text-white text-decoration-none">
                      
                    </a>
                  </li>
                </ul>
              </div>
             
    
              {/* Links Section */}
              <div className="col-md-4 mb-3">
                <h5>Quick Links</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="/" className="text-white text-decoration-none">
                      Home
                    </a>
                  </li>
                  
                  <li>
                    <a href="/About_us" className="text-white text-decoration-none">
                      About Us
                    </a>
                  </li>

                  <li>
                    <a href="/Academic/calander" className="text-white text-decoration-none">
                    Academic Calender
                    </a>
                  </li>

                  <li>
                    <a href="/Academic/Time_table" className="text-white text-decoration-none">
                    Academic Time Table
                    </a>
                  </li>
                  
                </ul>
              </div>
    
              {/* Contact Section */}
              <div className="col-md-4 mb-3">
                <h5>Contact</h5>
              
                  <i className="bi bi-geo-alt-fill">Kalvi Vallal N. Kesavan salai, Medical College Campus, Kalitheerthalkuppam, Puducherry 605107</i> 
                
                <p>
                  <i className="">0413-2643007</i> 
                </p>
                <p>
                <a href="mailto:cseicb@mvit.edu.in">
                  <i className="bi bi-envelope-fill">cseicb@mvit.edu.in</i> 
                </a>
                </p>
              </div>
            </div>
    
            {/* Footer Bottom */}
            <div className="text-center mt-4">
              <p className="mb-0">Copyright &copy; {new Date().getFullYear()}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      );
}