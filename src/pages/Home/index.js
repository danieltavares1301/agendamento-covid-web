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

  const schema = Yup.object().shape({
    name: Yup.string().required("O campo de nome precisa ser preenchido!"),
    birthDate: Yup.date().required(
      "O campo de data de nascimento precisa ser preenchido!"
    ),
    appointmentTime: Yup.number().required("O campo precisa ser preenchido!"),
    appointmentDate: Yup.date().required("appointmentDate is required"),
    isFinished: Yup.boolean().default(false),
    description: Yup.string(),
  });

  // pega dados do BD ao entrar na aplicação
  useEffect(() => {
    axios
      .get("http://localhost:4000/schedule")
      .then((res) => setData(res.data));
  }, []);

  // quando a state data for alterada, ela é colocada novamente no localStorage
  useEffect(() => {
    localStorage.setItem("dados", JSON.stringify(data));
  }, [data]);

  const onSubmit = async (values) => {
    //pega quantidade de vezes que aquele dia foi cadastrado
    const dias = data.filter(
      (item) => item.appointmentDate === values.appointmentDate.toISOString()
    ).length; // Se for igual a data, pega a quantidade de datas

    //pega quantidade de horarios que sejam igual ao que o usuário pretende cadastrar
    const horas = data
      .filter(
        (item) => item.appointmentDate === values.appointmentDate.toISOString()
      ) // Se for igual a data
      .filter(
        (item) => item.appointmentTime.toString() === values.appointmentTime
      ).length; // se for igual ao horário

    if (dias < 20) {
      if (horas < 2) {
        return await axios
          .post("http://localhost:4000/schedule", {
            name: values.name,
            birthDate: values.birthDate,
            appointmentDate: values.appointmentDate,
            appointmentTime: values.appointmentTime,
          })
          .then((response) => setData([...data, response.data.schedule])) //.schedule pois o backend também retorna uma messagem dentro de data
          .then(() =>
            alert(
              `agendamento do paciente ${values.name} foi realizado com sucesso!`
            )
          )
          .catch((error) => console.erro(error.message));
      } else {
        alert("HORÁRIO NÃO possui vagas disponíveis!");
      }
    } else {
      alert("DIA NÃO possui vagas disponíveis!");
    }
  };

  return (
    <div>
      <Formik
        onSubmit={onSubmit}
        validationSchema={schema}
        initialValues={{
          name: "",
          birthDate: "",
          appointmentDate: "",
          appointmentTime: "",
          isFinished: "",
          description: "",
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div>
              <label htmlFor="name">Nome</label>
              <br />
              <Field id="name" name="name" type="text" />
              <ErrorMessage component="div" name="name" />
            </div>
            <label htmlFor="birthDate">Data de nascimento</label>

            <Field id="birthDate" name="birthDate">
              {() => (
                <DatePicker
                  selected={values.birthDate}
                  onChange={(birthDate) =>
                    setFieldValue("birthDate", birthDate)
                  }
                  name="birthDate"
                />
              )}
            </Field>

            <br />

            <label htmlFor="appointmentDate">data de agendamento</label>

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
            <br />
            <label htmlFor="appointmentTime">horário de agendamento</label>
            <Field
              as="select"
              name="appointmentTime"
              id="appointmentTime"
              type="number"
            >
              {
                // lista de horários de atendimento durante o dia
                [8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item) => (
                  <option value={item} key={item}>
                    {`${item}:00`}
                  </option>
                ))
              }
            </Field>
            <br />
            <button type="submit">submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Home;
