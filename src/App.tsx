import { Routes, Route } from "react-router-dom"
import './App.css';
import Main from "./components/Main"
import Answers from "./components/Answers"
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (  
    <Routes>
      <Route path="/home" element={<Main/>} />
      <Route path="/answers" element={<Answers/>}/>
      <Route path="/" element={<LandingPage/>}/>
    </Routes>
  )
}

export default App
