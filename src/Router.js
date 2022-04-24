import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Schedules from './pages/Schedules';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Schedules" element={<Schedules />} />
          <Route path="*" element={<h1>Page Not Found!</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
