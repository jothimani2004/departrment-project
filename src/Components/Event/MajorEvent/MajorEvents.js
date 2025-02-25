import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import "./MajorEvents.css";
import UseApiGet from "../../../Custom_hook/apiGetCall";
import UseApiPost from "../../../Custom_hook/apiPostCall";
import UseApiDelete from "../../../Custom_hook/apiDeleteCall";
import UseApiPut from "../../../Custom_hook/apiPutCall";
import { checkJwtCookie } from "../../Jwt_verify/checkJwtCookie.jsx";

const MajorEvents = () => {
  const role = checkJwtCookie({ returnme: "role" });
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [editContent, setEditContent] = useState({ videoId: "", title: "", location: "", date: "", time: "", abstract: "" });
  const [selectFile, setSelectFile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Show loading
      const data = await UseApiGet("/major_event");
      setJournals(data);
      setLoading(false); // Hide loading
    }
    fetchData();
  }, []);

  const handleDelete = async (title, objectId) => {
    const confirmDelete = window.confirm(`Do you want to delete this event: ${title}?`);
    if (confirmDelete) {
      setLoading(true);
      await UseApiDelete({ path: "/major_event", body: { object: objectId } });
      setJournals(journals.filter((journal) => journal._id !== objectId));
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 mb-5 pt-4">
      <div className="d-flex justify-content-between align-items-center mb-4 w-100 px-5">
        <h1 className="h1">Upcoming Events</h1>
        {role === "Admin" && (
          <button className="btn btn-primary mx-1 my-3" onClick={() => setShowPopup(true)}>
            Add New Event
          </button>
        )}
      </div>
  return (<>

    <Container className="mt-5 mb-5  pt-4">
          
          <div className="d-flex justify-content-between align-items-center mb-4 w-100 px-5">

          <h1 className="h1 text-center"> Upcomming Events</h1>
            <div>
            {role =="Admin"?<button class="btn btn-primary mx-1 my-3 "
                onClick={()=> setting_pop_field([])}
                >Add New Events </button>:null}
            </div>
          </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row xs={1} sm={2} md={2} className="g-5">
          {journals.length > 0 ? (
            journals.map((journal, index) => (
              <Col key={index}>
                <Card className="event-card pt-0">
                  <img
                    src={`data:${journal.file.mimetype};base64,${journal.file.buffer}`}
                    alt="Event"
                    width="100%"
                    height="400px"
                    className="border rounded-top-3"
                  />
                  <Card.Body className="s_b t_c rounded-bottom-3">
                    <Card.Title className="event-title">{journal.data.title}</Card.Title>
                    <Card.Text className="event-description">{journal.data.abstract}</Card.Text>
                    <Card.Text>
                      <small className="text-muted">
                        Date: {journal.data.date} | Location: {journal.data.location} | Time: {journal.data.time}
                      </small>
                    </Card.Text>
                    {role === "Admin" && (
                      <>
                        <button className="btn btn-primary mx-1">Edit</button>
                        <button className="btn btn-danger mx-1" onClick={() => handleDelete(journal.data.title, journal._id)}>
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Card.Body>

      <Row xs={1} sm={2} md={2} className="g-5">

        {
        journals.length >0?

        journals.map((journal, index) => (

          <Col key={index}>
            <Card className="event-card  pt-0">
              
    
            <img
                src={`data:${journal.file.mimetype};base64,${journal.file.buffer}`}
                alt="Event Image"
                className="event-image"
            />

              <Card.Body className="s_b t_c rounded-bottom-3">
                <Card.Title className="event-title">{journal.data.title}</Card.Title>
                <Card.Text className="event-description">
                  {journal.data.abstract}
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">
                    Date: {journal.data.date} | Location: {journal.data.location} | Time: {journal.data.time}
                  </small>
                </Card.Text>

                {role =="Admin"?<button class="btn btn-primary mx-1"
                  id ={`ej_${index}`}
                onClick={()=> setting_pop_field([journal.data.title,journal.data.location,journal.data.date,journal.data.time,journal.data.abstract,journal._id])}
                >Edit</button>:null}

                {role =="Admin"?<button class="btn btn-danger mx-1"
                onClick={(e)=>handleDelete(journal.data.title,journal._id,e)}
            >
                  <i class="bi bi-trash"></i> Delete
                </button>:null}
                
              </Card.Body>
            </Card>
          </Col>
        )):<Card.Body>
              <Card.Text>
                <h2 className="text-center" style={{ color: "rgba(233, 48, 48, 0.89)" }}>
                  <strong>No Content Found</strong>
                </h2>
              </Card.Text>
            </Card.Body>
          )}
        </Row>
      )}
    </Container>
  );
};

export default MajorEvents;
