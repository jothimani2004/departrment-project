import { useState, useEffect } from "react";
import style from "./Seperate_student_Edit.module.css";
import { Spinner } from "react-bootstrap";
import { checkJwtCookie } from "../../Jwt_verify/checkJwtCookie.jsx";
import { FaCreativeCommonsPdAlt } from "react-icons/fa";
import { formToJSON } from "axios";

export default function Seperate_student_Edit({ title }) {
  const [editContent, setEditContent] = useState(null);
   // Start with null until data is fetched
  const [imageFile, setImageFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Popup visibility state
  const [imageSrc, setImageSrc] = useState(
    "https://assets.leetcode.com/users/Hirthick_Gowtham-G/avatar_1728091794.png"
  );

  useEffect(() => {
    const userData = checkJwtCookie();
    if (!userData) {
      console.error("No JWT data found");
      return;
    }
  
    const fetchData = async () => {
      try {
        console.log("Fetching data for reg:", userData.jwtPayload.reg);
        const response = await fetch("http://localhost:5000/fetchProfile", {
          method: "POST", // Use POST instead of GET
          headers: {
            "Content-Type": "application/json", // Set the appropriate headers
          },
          body: JSON.stringify({ reg: userData.jwtPayload.reg }), // Send the reg value in the body
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        
        setEditContent({
          profilePhoto: (data.profile_photo?data.profile_photo:""),
          profileSummary: data.profile_desc,
          linkedinLink: data.linkedin_link,
          githubLink: data.github_link,
          gmailLink: data.email,
          leedcodeLink: data.leetcode_link,
          profileResume: data.resume
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditContent((prevContent) => ({
      ...prevContent,
      [name]: value, // Update the corresponding field in the state
    }));
  };

  // New function to handle file input changes
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "profileImage") {
      if (file) {
        setImageFile(URL.createObjectURL(file)); // Preview the uploaded image
      }
    } else if (type === "resume") {
      setEditContent((prevContent) => ({
        ...prevContent,
        profileResume: file, // Update resume file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Update profile data (send the updated data to your API)
      const formData = new FormData();
      formData.append('profile_photo', imageFile);
      formData.append('profile_desc', editContent.profileSummary);
      formData.append('linkedin_link', editContent.linkedinLink);
      formData.append('github_link', editContent.githubLink);
      formData.append('email', editContent.gmailLink);
      formData.append('leetcode_link', editContent.leedcodeLink);
      formData.append('resume', editContent.profileResume);

      console.log(formData)
      const response = await fetch('/editProfile', {
        method: 'POST',
        body: formData, // Send the form data
      });

      if (response.ok) {
        setShowPopup(false); // Close the popup after successful submission
        // Optionally, you could show a success message here
      } else {
        console.error("Error updating profile data.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file)); // Preview the uploaded image
    }
  };

  if (!editContent) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      <div className={style.con}>
        <div className={style.texting_div}>
          <button className={style.edit_button} onClick={() => setShowPopup(true)}>
            Edit Your Profile
          </button>
        </div>
        <h1>{title}</h1>
        <div className={style.content}>
          <h2>Summary</h2>
          <div className={style.para}>
            <div>
              <p>{editContent.profileSummary}</p>
              <div className={style.option}>
                <li>
                  <img
                    src="/images/student_seperate_page/linked_in.png"
                    alt="linkedin"
                    height="10px"
                  />{" "}
                  Linked in
                </li>
                <li>
                  <img
                    src="/images/student_seperate_page/github.png"
                    alt="github"
                    height="10px"
                  />{" "}
                  Github
                </li>
                <li>
                  <img
                    src="/images/student_seperate_page/mail.png"
                    alt="mail"
                    height="10px"
                  />{" "}
                  Gmail
                </li>
                <li>
                  <img
                    src="/images/student_seperate_page/leetcode.png"
                    alt="leet code"
                    height="10px"
                  />
                  Leet code
                </li>
              </div>
            </div>
            <div className={style.image_cover}>
              <div className={style.image}>
                <div className={style.image_size}>
                  {imageSrc ? (
                    <img src={imageSrc} alt="Fetched Image" />
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.line}></div>

        <div className={style.pdf_container}>
          <h1>Resume</h1>
          <div className={style.card_size}>
            <iframe
              src="/assets/HIRTHICK GOWTHAM 1.pdf"
              width="100%"
              height="1120px"
              title="PDF Viewer"
            ></iframe>
          </div>
        </div>
      </div>

      {showPopup && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Your Profile</h5>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group mb-3">
                    <label>Upload Profile Image</label>
                    {imageFile && (
                      <div className="image-preview" style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <img
                          src={imageFile}
                          alt="Profile Preview"
                          style={{ maxWidth: "200px", objectFit: "cover" }}
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Profile Summary</label>
                    <textarea
                      name="profileSummary"
                      value={editContent.profileSummary}
                      className="form-control custom_textarea"
                    ></textarea>
                  </div>
                  <div className="form-group mb-3">
                    <label>Linkedin (link)</label>
                    <input
                      type="text"
                      name="linkedinLink"
                      value={editContent.linkedinLink}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Github (link)</label>
                    <input
                      type="text"
                      name="githubLink"
                      value={editContent.githubLink}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Gmail Address</label>
                    <input
                      type="text"
                      name="gmailLink"
                      value={editContent.gmailLink}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Leetcode (link)</label>
                    <input
                      type="text"
                      name="leedcodeLink"
                      value={editContent.leedcodeLink}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Upload Resume</label>
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, "resume")}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowPopup(false)}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
