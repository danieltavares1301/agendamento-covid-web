import { useEffect, useState } from "react";

const Schedules = () => {
  const [data, setData] = useState([]);

  const inOrder = data.reduce((object, item) => {
    object[item.appointmentDate] = data
      .filter((value) => value.appointmentDate === item.appointmentDate)
      .sort(
        (compare1, compare2) =>
          compare1.appointmentTime - compare2.appointmentTime
      );
    return object;
  }, {});

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("data")));
  }, []);

  return (
    <div>
      <button onClick={() => console.log(inOrder)}>
        Mostra dados no console
      </button>
    </div>
  );
};
export default Schedules;
