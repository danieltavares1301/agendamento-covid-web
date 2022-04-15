import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import BirthDate from "../../components/BirthDate";
import AppointmentDate from "../../components/AppointmentDate";
import NameField from "../../components/NameField";

const Home = () => {
  // unavailable times for vaccination (vaccination works between 8 am and 8 pm as in many health posts in the country)
  const list = [0, 1, 2, 3, 4, 5, 6, 7, 19, 20, 21, 22, 23];

  //const [data, setData] = useState([]); // data that has already been saved
  const [errorDate, setErrorDate] = useState(false);

  // data validation schema
  const schema = Yup.object().shape({
    name: Yup.string().min(2).max(255).required("Name is required"),
    appointmentDate: Yup.date().required("AppointmentDate is required"),
    birthDate: Yup.date().required("BirthDate is required"),
  });

  const onSubmit = async (values) => {
    // if a time is entered that is not in the list of available times, error will be true
    if (list.indexOf(values.appointmentDate.getHours()) !== -1) {
      return setErrorDate(true);
    }
    setErrorDate(false);

    return await axios
      .post("http://localhost:4000/api/users", {
        name: values.name,
        appointmentDate: values.appointmentDate.toISOString(),
        birthDate: values.birthDate.toISOString(),
      })
      .then((res) => console.log(res))
      .catch((error) => console.erro(error));
  };

  // shows created data
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/api/users")
  //     .then((res) => setData(res.data))
  //     .catch((error) => console.error(error));
  //   console.log(data);
  // }, []);

  //var dataH = new Date(`${data[15] ? data[15].date : ""}`);
  //var dataFormatada = dataH.getHours();
  //dsadasd
  //console.log(dataFormatada);

  return (
    <div>
      <h2>Vaccination form</h2>
      <Formik
        onSubmit={onSubmit}
        validationSchema={schema}
        initialValues={{
          name: "",
          appointmentDate: "",
          birthDate: "",
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <NameField />
            <BirthDate
              name="birthDate"
              value={values.birthDate}
              onChange={(date) => setFieldValue("birthDate", date)}
            />
            <AppointmentDate
              value={values.appointmentDate}
              list={list}
              onchange={(date) => setFieldValue("appointmentDate", date)}
            />
            {errorDate ? (
              <div style={{ color: "red" }}>
                Select an available day and time
              </div>
            ) : null}

            <button type="submit">submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Home;
