import Router from "./Router";
import AppContextProvider from "./AppContextProvider";

const App = () => (
  <AppContextProvider>
    <Router />
  </AppContextProvider>
);

export default App;
