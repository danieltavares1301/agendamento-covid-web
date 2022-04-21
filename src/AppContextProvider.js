import { createContext, useState, useEffect } from "react";
import api from "./services/api";

export const AppContext = createContext(); // criação no app para páginas a escutarem

const AppContextProvider = ({ children }) => {
  // state para renderizar na aplicação
  const [data, setData] = useState([]);

  // pega dados do BD ao entrar na aplicação
  const loadingData = async () => {
    try {
      await api
        .get("http://localhost:4000/schedule")
        .then((res) => setData(res.data));
    } catch {
      alert("ocorreu um erro!");
    }
  };

  useEffect(() => {
    loadingData();
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <AppContext.Provider value={[data, setData, loadingData]}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
