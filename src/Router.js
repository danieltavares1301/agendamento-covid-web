import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Page Not Found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
