import { useContext } from 'react';
import DataTable from '../../components/DataTable';
import { AppContext } from '../../AppContextProvider';

const Schedules = () => {
  const [data] = useContext(AppContext);
  const dataVerify = JSON.parse(localStorage.getItem('data'));

  // recarrega a página para que a tabela pegue os dados atualizados
  if (data.length !== dataVerify.length) {
    window.location.reload(true);
  }

  // objeto que terá a data como chave e todos os agendados marcados nela como valor (array de objetos)
  const inOrder = data.reduce((object, item) => {
    object[item.appointmentDate] = data
      .filter(value => value.appointmentDate === item.appointmentDate) // pega apenas objetos que tenham a data da chave
      .sort((date1, date2) => {
        // coloca data em ordem
        const newDate1 = new Date(date1.appointmentDate).toString();
        const newDate2 = new Date(date2.appointmentDate).toString();
        return newDate1 - newDate2;
      })
      .sort(
        // coloca hora de agendamento em ordem crescente
        (compare1, compare2) =>
          compare1.appointmentTime - compare2.appointmentTime,
      );
    return object;
  }, {});

  // pega apenas os valores do objeto, ou seja, em cada indice tem uma lista de objetos nas quais suas chaves eram datas
  const valuesInOrder = Object.values(inOrder);

  // formata data para formato local
  const dateFormated = item => {
    const date = new Date(item);
    return date.toLocaleDateString();
  };

  return (
    <div>
      {valuesInOrder.map((item, index) => {
        // pega apenas as chaves do objeto, ou seja, as datas. Depois, formata as datas
        const datesValuesInOrder = Object.keys(inOrder).map(date =>
          dateFormated(date),
        );
        // retorna uma tabela para cada data (valores da lista de datas em ordem)
        // cujas linhas da tabela são as listas que constituem as os valores da lista de datas em ordem
        return (
          <DataTable list={item} appointmentDate={datesValuesInOrder[index]} />
        );
      })}
    </div>
  );
};
export default Schedules;
