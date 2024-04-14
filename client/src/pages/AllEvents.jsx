// Importing necessary libraries
import React, { useEffect, useState } from "react";
import Card from "../components/Card"; // Importing the Card component
import Axios from "axios";

// Define the AllEvents component
function AllEvents() {
  // State variables
  const [data, setData] = useState([]);

  // Function to fetch all events from the server
  const getAllEvents = async () => {
    try {
      const res = await Axios.get("http://127.0.0.1:8000/api/v1/view-events");
      console.log(res);
      if (res.status === 200) {
        setData(res.data.events); // Update the state with received events data
      }
    } catch (error) {
      console.log("Could not get all events due to ", error.message);
    }
  };

  // useEffect hook to fetch all events on component mount and whenever 'data' changes
  useEffect(() => {
    getAllEvents();
  }, [data]);

  // Render the component
  return (
    <div>
      {/* Title */}
      <div className="mx-auto text-3xl font-semibold flex justify-center m-2">
        All Events
      </div>

      {/* Render all events as Card components */}
      {data && data.length > 0 ? (
        data.map((ele, indx) => (
          <Card
            key={indx} // Adding a unique key prop to each Card component
            eventName={ele.event_name}
            date={ele.date}
            time={ele.time}
            liked={ele.liked === true}
            image={ele.image}
          />
        ))
      ) : (
        <div>No events available</div>
      )}
    </div>
  );
}

// Export the AllEvents component
export default AllEvents;
