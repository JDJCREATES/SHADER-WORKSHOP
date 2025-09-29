import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

// use router to define different demo page links
export default function AppRoutes() {
  return (
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
   
  );
}
