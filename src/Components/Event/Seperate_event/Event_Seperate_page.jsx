import style from "./Event_Seperate_page.module.css"
import "bootstrap/dist/css/bootstrap.min.css";


export default function Event_Seperate_page({title}){


    return(
        <>
      <div className="container my-2">
      {/* Event Header */}
      <header className="text-center mb-4">
        <h1 className="display-4 fw-normal">Elan 2025: Annual Cultural Festival</h1>
        <p className="lead text-muted fw-normal">
          Join us for a spectacular celebration of culture, music, and art!
        </p>
      </header>

      {/* Banner Image */}
      <div
        className="d-flex justify-content-center align-items-center bg-dark text-white rounded-4"
        style={{
          height: "60vh", // Adjusts proportionally for different devices
          backgroundImage: `url("/images/event_page/elan.jpeg")`, // Replace with your image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* About the Event */}
      <section className="my-4">
        <h1>About the Event</h1>
        <p className="fs-5 ms-2 ms-md-5">
          Elan 2025 is a premier cultural festival showcasing vibrant music,
          stunning performances, and a celebration of art and diversity. This
          year, we’re bringing you an unforgettable experience with renowned
          artists, cultural workshops, and engaging activities for all age
          groups.
        </p>
      </section>

      {/* Event Schedule */}
      <section className="my-4">
        <h1>Event Schedule</h1>
        <ul className="list-group ms-2 ms-md-5">
          <li className="list-group-item fs-5">
            <strong className="fs-4">Date:</strong> Saturday, February 15, 2025
          </li>
          <li className="list-group-item fs-5">
            <strong className="fs-4">Time:</strong> 10:00 AM to 10:00 PM
          </li>
          <li className="list-group-item fs-5">
            <strong className="fs-4">Venue:</strong> Grand Auditorium, City Center
          </li>
        </ul>
      </section>
    </div>
        </>
    )
}