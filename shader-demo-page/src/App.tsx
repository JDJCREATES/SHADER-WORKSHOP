import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import './styles/main.scss'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
