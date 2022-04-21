import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
const Schedules = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("data")));
  }, []);

  // objeto que terá a data como chave e todos os agendados marcados nela como valor (array de objetos)
  const inOrder = data.reduce((object, item) => {
    object[item.appointmentDate] = data
      .filter((value) => value.appointmentDate === item.appointmentDate) // pega apenas objetos que tenham a data da chave
      .sort((date1, date2) => {
        // coloca data em ordem
        const newDate1 = new Date(date1.appointmentDate).toISOString();
        const newDate2 = new Date(date2.appointmentDate).toISOString();
        return newDate1 - newDate2;
      })
      .sort(
        // coloca hora de agendamento em ordem crescente
        (compare1, compare2) =>
          compare1.appointmentTime - compare2.appointmentTime
      );
    return object;
  }, {});

  // pega apenas os valores do objeto, ou seja, em cada indice tem uma lista de objetos nas quais suas chaves eram datas
  const valuesInOrder = Object.values(inOrder);

  // formata data para formato local
  const dateFormated = (item) => {
    const date = new Date(item);
    return date.toLocaleDateString();
  };

  return (
    <div>
      {valuesInOrder.map((item, index) => {
        // pega apenas as chaves do objeto, ou seja, as datas. Depois, formata as datas
        const datesValuesInOrder = Object.keys(inOrder).map((date) =>
          dateFormated(date)
        );
        // retorna uma tabela para cada data (valores da lista de datas em ordem)
        // cujas linhas da tabela são as listas que constituem as os valores da lista de datas em ordem
        return (
          <DataTable
            list={item}
            appointmentDate={datesValuesInOrder[index]}
            data={data}
            setData={setData}
          />
        );
      })}
    </div>
  );
};
export default Schedules;
