

import { BrowserRouter, Route , Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import Test from "./Pages/Test/Test";
import Result from "./Pages/Result/Result";
import { useState } from "react";
import axios from "axios";

function App() {
  const [name , setName] = useState("");
  const [questions , setQuestions] = useState("");
  const [score , setScore] = useState(0);

  const fetchQuestions = async(category='',difficulty='') => {
    const {data} = await axios.get(`https://opentdb.com/api.php?amount=10${category &&`&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`);

    console.log(data);
    setQuestions(data.results);
  }
  return (
    <BrowserRouter>
      <div className="app" style={{ backgroundImage: "url(./background.jpg)" }}>
        <Header />

        <Routes>
        <Route 
        path="/" 
        element={ <Home name={name} setName={setName} fetchQuestions={fetchQuestions}/> } />
        <Route 
        path="/test" 
        element={ <Test name={name} questions={questions} score={score} setScore={setScore}/> } />
        <Route 
        path="/result" 
        element={ <Result name={name} score={score}/> } />
       </Routes>

      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
