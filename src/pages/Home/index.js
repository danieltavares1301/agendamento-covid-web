import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { validatorSchema } from '../../validators';
import DateField from '../../components/DateField';
import NameField from '../../components/NameField';
import { AppContext } from '../../contexts/AppContextProvider';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import SelectionField from '../../components/SelectionField';

const Home = () => {
  const navigate = useNavigate();
  const [data, FetchData] = useContext(AppContext);

  // horários de agendamento
  const timesList = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  // data selecionado
  const [dateSelected, setDateSelected] = useState();

  // função para atualizar timeList
  const updateTimeList = () => {
    const obj = data
      .filter(
        // pegará apenas objetos que contém a data escolhida
        item =>
          new Date(dateSelected).toString() ===
          new Date(item.appointmentDate).toString(),
      )
      .reduce((object, item) => {
        // a chave será o horário e seu valor será quantas vezes aparece
        if (!object[item.appointmentTime]) {
          object[item.appointmentTime] = 1;
        } else {
          object[item.appointmentTime]++;
        }
        return object;
      }, {});

    const keys = Object.keys(obj); // horários
    const values = Object.values(obj); // quantas vezes foi selecionado

    // retira da lista de horários de agendamentos disponíveis os números que aparecerem na
    // na lista de horários já cadastrados, se forem cadastrados 2 ou mais vezes
    for (var i = 0; i < timesList.length; i++) {
      for (var j = 0; j < keys.length; j++) {
        if (timesList[i].toString() === keys[j] && values[j] >= 2) {
          timesList.splice(i, 1);
          i--;
        }
      }
    }
    return timesList;
  };
  // atualiza lista de horários toda vez que o usuário escolher uma data
  useEffect(() => {
    updateTimeList();
  }, [dateSelected]);

  const onSubmit = async values => {
    //pega quantidade de vezes que aquele dia foi cadastrado
    const dates = data.filter(
      item => item.appointmentDate === values.appointmentDate.toISOString(),
    ).length; // Se for igual a data, pega a quantidade de datas

    //pega quantidade de horarios que sejam igual ao que o usuário pretende cadastrar
    const hours = data
      .filter(
        item => item.appointmentDate === values.appointmentDate.toISOString(),
      ) // Se for igual a data
      .filter(
        item => item.appointmentTime.toString() === values.appointmentTime,
      ).length; // se for igual ao horário

    if (dates < 20) {
      // segunda validação do horário
      if (hours < 2) {
        return await api
          .post('/', {
            name: values.name,
            birthDate: values.birthDate,
            appointmentDate: values.appointmentDate,
            appointmentTime: values.appointmentTime,
          })
          .then(() => {
            FetchData();
            alert(
              `agendamento do paciente ${values.name} foi realizado com sucesso!`,
            );
            return navigate('/schedules');
          })
          .catch(() => alert('Um erro inesperado ocorreu!'));
      } else {
        alert('HORÁRIO NÃO possui vagas disponíveis!');
      }
    } else {
      alert('DIA NÃO possui vagas disponíveis!');
    }
  };

  return (
    <div>
      <Formik
        onSubmit={onSubmit}
        validationSchema={validatorSchema}
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
              onBlur={
                /*ao clicar fora do componente, o valor da data é pego para verificação de horários disponíveis*/
                setDateSelected(values.appointmentDate)
              }
            />

            <label htmlFor="appointmentTime">Horário de agendamento</label>
            <SelectionField timesList={timesList} name="appointmentTime" />

            <br />
            <button type="submit">Cadastrar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Home;
