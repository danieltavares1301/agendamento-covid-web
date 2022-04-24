import Router from './Router';
import AppContextProvider from './contexts/AppContextProvider';

const App = () => (
  <AppContextProvider>
    <Router />
  </AppContextProvider>
);

export default App;
