import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Axios from "axios";

function AllEvents() {
  const [data, setData] = useState([]);
  const getAllEvents = async () => {
    try {
      const res = await Axios.get("http://127.0.0.1:8000/api/v1/view-events");
      console.log(res);
      if (res.status === 200) {
        setData(res.data.events);
      }
    } catch (error) {
      console.log("Could not get all events due to ", error.message);
    }
    // console.log("Events ", data);
  };
  useEffect(() => {
    getAllEvents();
  }, [data]);
  return (
    <div>
      <div className="mx-auto text-3xl font-semibold flex justify-center m-2">
        All Events
      </div>
      {data && data.length > 0
        ? data.map((ele, indx) => (
            <Card
              key={indx} // Adding a unique key prop to each Card component
              eventName={ele.event_name}
              date={ele.date}
              time={ele.time}
              liked={ele.liked === true}
              image={ele.image}
            />
          ))
        : ""}
    </div>
  );
}

export default AllEvents;
