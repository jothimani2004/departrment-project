export const Footer = () =>{
    return (
        <footer className="bg-dark text-white py-4" id="Contact">
          <div className="container">
            <div className="row">
              {/* About Section */}
              <div className="col-md-4 mb-3">
                <h5>About Us</h5>
                <p>
                  We are committed to providing the best solutions for your business needs. 
                  Our team focuses on innovation and quality.
                </p>
              </div>
    
              {/* Links Section */}
              <div className="col-md-4 mb-3">
                <h5>Quick Links</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#home" className="text-white text-decoration-none">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-white text-decoration-none">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="text-white text-decoration-none">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-white text-decoration-none">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
    
              {/* Contact Section */}
              <div className="col-md-4 mb-3">
                <h5>Contact</h5>
                <p>
                  <i className="bi bi-geo-alt-fill"></i> 123 Main Street, City, Country
                </p>
                <p>
                  <i className="bi bi-telephone-fill"></i> +1 234 567 890
                </p>
                <p>
                  <i className="bi bi-envelope-fill"></i> info@example.com
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