import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import BirthDate from "../../components/BirthDate";
import AppointmentDate from "../../components/AppointmentDate";

const Home = () => {
  const list = [0, 1, 2, 3, 4, 5, 6, 7, 19, 20, 21, 22, 23];
  const [data, setData] = useState([]);
  const [erro, setErro] = useState(false);
  const schema = Yup.object().shape({
    name: Yup.string().min(2).max(255).required("Name is required"),

    date: Yup.date().required("Date is required"),
    birthDate: Yup.date(),
  });

  const onSubmit = async (values) => {
    if (list.indexOf(values.date.getHours()) !== -1) {
      return setErro(true);
    }
    setErro(false);
    return await axios
      .post("http://localhost:4000/api/users", {
        name: values.name,
        date: values.date.toISOString(),
        birthDate: values.birthDate.toISOString(),
      })
      .then((res) => console.log(res))
      .catch((error) => console.erro(error));
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users")
      .then((res) => setData(res.data))
      .catch((error) => console.error(error));
    console.log(data);
  }, [data]);

  //var dataH = new Date(`${data[15] ? data[15].date : ""}`);
  //var dataFormatada = dataH.getHours();
  //dsadasd
  //console.log(dataFormatada);
  return (
    <div>
      <h2>Formik</h2>
      <Formik
        onSubmit={onSubmit}
        validationSchema={schema}
        initialValues={{
          name: "",
          date: "",
          birthDate: "",
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div>
              <label htmlFor="name">Nome</label>
              <Field id="name" name="name" type="text" />
              <ErrorMessage component="div" name="name" />
            </div>
            <AppointmentDate
              value={values.date}
              list={list}
              onchange={(date) => setFieldValue("date", date)}
            />
            <BirthDate
              name="birthDate"
              value={values.birthDate}
              onChange={(date) => setFieldValue("birthDate", date)}
            />

            {erro === true ? <div>indisponivel</div> : null}
            <button type="submit">submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Home;
