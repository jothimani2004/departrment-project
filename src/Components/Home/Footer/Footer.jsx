export const Footer = () =>{
    return (
        <footer className="bg-dark text-white py-4" id="Contact">
          <div className="container">
            <div className="row">
              {/* About Section */}
              <div className="col-md-4 mb-3">
                <h5>About Us</h5>
                <p>
                Welcome to our college, committed to quality education and innovation.  
                We empower students through knowledge, research, and community engagement.
                </p>
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
                    <a href="#Contact" className="text-white text-decoration-none">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
    
              {/* Contact Section */}
              <div className="col-md-4 mb-3">
                <h5>Contact</h5>
                <p>
                  <i className="bi bi-geo-alt-fill">Kalvi Vallal N. Kesavan salai, Medical College Campus, Kalitheerthalkuppam, Puducherry 605107</i> 
                </p>
                <p>
                  <i className="bi bi-telephone-fill">0413-2643007</i> 
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
              <p className="mb-0">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
          </div>
        </footer>
      );
}