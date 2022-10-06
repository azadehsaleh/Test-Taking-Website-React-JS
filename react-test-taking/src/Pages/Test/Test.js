import { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import "./Test.css"
import Question from "../../components/Question/Question";

const Test = ({name, score, questions, setQuestions, setScore}) => {

    const [options, setOptions ] = useState ();
    const [currentQuestion, setCurrentQuestion ] = useState (0);

    useEffect( () => {
        console.log(questions);

        setOptions(questions && 
            handleShuffle([
                questions[currentQuestion]?.correct_answer,
                ...questions[currentQuestion]?.incorrect_answers
            ]))
    }, [questions,currentQuestion]);

    const handleShuffle = (optionss) => {
        return optionss.sort( () => Math.random() - 0.5);
    }

    return(
        <div className="test">
            <span className="welcome-text">Welcome, {name}</span>
           
            { questions ? (
                <>
                <div className="testInfo">
                    <span>{questions[currentQuestion].category}</span>
                    <span>Score: {score}</span>
                </div>

                <Question 
                    currentQuestion = {currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                    questions={questions}
                    options={options}
                    correct={questions[currentQuestion]?.correct_answer}
                    score={score}
                    setScore={setScore}/>
                </>
            ): (
                 <CircularProgress 
                 style={{margin:100}}
                 color="inherit"
                 size={150}
                 thickness={1}/>
            )}
        </div>
    )
}
export default Test