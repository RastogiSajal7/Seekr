import { Routes, Route } from "react-router-dom";
import './App.css';
import Answers from "./components/Answers";
import LandingPage from "./pages/LandingPage";
import Home from "./components/Home";

const App = () => {
  return (  
    <Routes>
      <Route path="/home" element={<Home search={undefined}/>} />
      <Route path="/answers" element={<Answers/>}/>
      <Route path="/" element={<LandingPage/>}/>
    </Routes>
  )
}

export default App
