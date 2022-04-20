import { useEffect, useState } from "react";

const Schedules = () => {
  const [data, setData] = useState();
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("data")));
    console.log(data);
  }, []);
  return (
    <div>
      {data.map((item) => (
        <>
          <div key={item._id}>
            {item.appointmentDate}
            {item.appointmentTime}
          </div>
        </>
      ))}
    </div>
  );
};
export default Schedules;
