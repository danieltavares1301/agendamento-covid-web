import * as Yup from 'yup';

export const validatorSchema = Yup.object().shape({
  name: Yup.string().required('O campo de nome precisa ser preenchido!'),
  birthDate: Yup.date('Selecione uma data válida!').required(
    'O campo de data de nascimento precisa ser preenchido!',
  ),
  appointmentTime: Yup.number().required(
    'O campo de horário de agendamento precisa ser preenchido!',
  ),
  appointmentDate: Yup.date('Selecione uma data válida!').required(
    'O campo de data de agendamento precisa ser preenchido!',
  ),
  isFinished: Yup.boolean().default(false),
  description: Yup.string(),
});
