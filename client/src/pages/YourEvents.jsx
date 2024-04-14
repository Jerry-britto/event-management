// This Component will be visilble if the user is logged in.
// It will display all the events which are registered by the user

import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Axios from "axios";
function YourEvents() {
  const [data, setData] = useState([]);
  async function getEvents() {
    try {
      // placing the request to the end point which delivers the user specific events
      const res = await Axios.get("http://127.0.0.1:8000/api/v1/user-events");
      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getEvents();
  }, [data]);
  return (
    <div>
      <div className="mx-auto text-3xl font-semibold flex justify-center m-2">
        Your Events
      </div>
      // Displaying the events
    </div>
  );
}

export default YourEvents;
