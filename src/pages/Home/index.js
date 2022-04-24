import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import DateField from '../../components/DateField';
import { AppContext } from '../../AppContextProvider';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import NameField from '../../components/NameField';

const Home = () => {
  const [data, loadingData] = useContext(AppContext);
  const navigate = useNavigate();
  //dsad

  const schema = Yup.object().shape({
    name: Yup.string().required('O campo de nome precisa ser preenchido!'),
    birthDate: Yup.date().required(
      'O campo de data de nascimento precisa ser preenchido!',
    ),
    appointmentTime: Yup.number().required(
      'O campo de horário de agendamento precisa ser preenchido!',
    ),
    appointmentDate: Yup.date().required(
      'O campo de data de agendamento precisa ser preenchido!',
    ),
    isFinished: Yup.boolean().default(false),
    description: Yup.string(),
  });

  const onSubmit = async values => {
    console.log(values);
    // //pega quantidade de vezes que aquele dia foi cadastrado
    // const dias = data.filter(
    //   item => item.appointmentDate === values.appointmentDate.toISOString(),
    // ).length; // Se for igual a data, pega a quantidade de datas

    // //pega quantidade de horarios que sejam igual ao que o usuário pretende cadastrar
    // const horas = data
    //   .filter(
    //     item => item.appointmentDate === values.appointmentDate.toISOString(),
    //   ) // Se for igual a data
    //   .filter(
    //     item => item.appointmentTime.toString() === values.appointmentTime,
    //   ).length; // se for igual ao horário

    // if (dias < 20) {
    //   if (horas < 2) {
    //     return await api
    //       .post('/', {
    //         name: values.name,
    //         birthDate: values.birthDate,
    //         appointmentDate: values.appointmentDate,
    //         appointmentTime: values.appointmentTime,
    //       })
    //       .then(() => {
    //         loadingData();
    //         alert(
    //           `agendamento do paciente ${values.name} foi realizado com sucesso!`,
    //         );
    //         return navigate('/schedules');
    //       })
    //       .catch(() => alert('Um erro inesperado ocorreu!'));
    //   } else {
    //     alert('HORÁRIO NÃO possui vagas disponíveis!');
    //   }
    // } else {
    //   alert('DIA NÃO possui vagas disponíveis!');
    // }
  };

  return (
    <div>
      <Formik
        onSubmit={onSubmit}
        validationSchema={schema}
        initialValues={{
          name: '',
          birthDate: '',
          appointmentDate: '',
          appointmentTime: '',
          isFinished: '',
          description: '',
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <label htmlFor="name">Nome</label>
            <br />
            <NameField name="name" id="name" />

            <label htmlFor="birthDate">Data de nascimento</label>
            <br />
            <DateField
              name="birthDate"
              onChange={birthDate => setFieldValue('birthDate', birthDate)}
              value={values.birthDate}
            />

            <label htmlFor="appointmentDate">Data de agendamento</label>
            <br />
            <DateField
              name="appointmentDate"
              onChange={appointmentDate =>
                setFieldValue('appointmentDate', appointmentDate)
              }
              value={values.appointmentDate}
            />

            <label htmlFor="appointmentTime">horário de agendamento</label>
            <Field
              as="select"
              name="appointmentTime"
              id="appointmentTime"
              type="number"
            >
              {
                // lista de horários de atendimento durante o dia
                [8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(item => (
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
