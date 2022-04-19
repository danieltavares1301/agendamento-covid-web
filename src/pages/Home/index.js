import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

//import BR from "date-fns/locale/pt-BR";
//import { registerLocale } from "react-datepicker";
// import setHours from "date-fns/setHours";
// import setMinutes from "date-fns/setMinutes";

//registerLocale("BR", BR);

const Home = () => {
  const [data, setData] = useState([]);
  const [dataFromLST, setDataFromLST] = useState([]);

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    appointmentHour: Yup.number().required("appointmentHour is required"),
    appointmentDate: Yup.date().required("appointmentDate is required"),
    isFinished: Yup.boolean().default(false),
    description: Yup.string(),
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/schedule")
      .then((res) => setData(res.data));
  }, []);
  useEffect(() => {
    localStorage.setItem("dados", JSON.stringify(data));
    setDataFromLST(JSON.parse(localStorage.getItem("dados")));
  }, [data]);

  //console.log(dataFromLST);

  const onSubmit = (values) => {
    //pega quantidade de vezes que aquele dia foi cadastrado
    const dias = dataFromLST.filter(
      (item) => item.appointmentDate === values.appointmentDate.toISOString()
    ).length; // Se for igual a data, pega a quantidade de datas

    //pega quantidade de horarios que sejam igual ao que o usuário pretende cadastrar
    const horas = dataFromLST
      .filter(
        (item) => item.appointmentDate === values.appointmentDate.toISOString()
      ) // Se for igual a data
      .filter(
        (item) => item.appointmentHour.toString() === values.appointmentHour
      ).length; // se for igual ao horário

    if (dias < 20) {
      if (horas < 2) {
        console.log("tem vaga");
      } else {
        console.log("HORARIO NAO tem vaga");
      }
    } else {
      console.log("DIA NAO tem vaga");
    }

    //console.log(dias, horas);
  };

  return (
    <div>
      <h2>Formik</h2>
      <Formik
        onSubmit={onSubmit}
        validationSchema={schema}
        initialValues={{
          name: "",
          email: "",
          appointmentDate: "",
          appointmentHour: "",
          isFinished: "",
          description: "",
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div>
              <label htmlFor="name">Nome</label>
              <Field id="name" name="name" type="text" />
              <ErrorMessage component="div" name="name" />
            </div>
            <div>
              <label htmlFor="email">email</label>
              <Field id="email" name="email" type="text" />
              <ErrorMessage component="div" name="email" />
              <br />
            </div>
            <label htmlFor="appointmentHour">Schedule</label>
            <Field
              as="select"
              name="appointmentHour"
              id="appointmentHour"
              type="number"
            >
              {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </Field>
            <br />

            <label htmlFor="appointmentDate">date</label>

            <Field id="appointmentDate" name="appointmentDate">
              {() => (
                <DatePicker
                  selected={values.appointmentDate}
                  onChange={(appointmentDate) =>
                    setFieldValue("appointmentDate", appointmentDate)
                  }
                  name="appointmentDate"
                />
              )}
            </Field>

            <button type="submit">submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Home;
