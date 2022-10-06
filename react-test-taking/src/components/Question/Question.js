import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./Question.css";
import { useNavigate } from 'react-router-dom';

const Question =({currentQuestion, setCurrentQuestion,questions,options,correct,setScore,score}) => {
    const [selectedAnswer, setSelectedAnswer] = useState();
    const [error, setError] = useState(false);

    const history = useNavigate();

    const handleSelect = (i) => {
        if (selectedAnswer === i && selectedAnswer === correct){
            return "correctSelect";
            
        } else if (selectedAnswer === i && selectedAnswer !== correct){
            console.log("2***");
            return "wrongSelect";
            
        } else if (i === correct){
            console.log("3***");
            return "correctSelect";
           
        }
    }

    const handleCheck = (i) => {
        setSelectedAnswer(i);
        console.log("***");
        console.log(selectedAnswer);
        if (i === correct) setScore(score+1);
        setError(false);
    }

    const handleExit = () =>{

    }
    
    const handleNext = () => {
        if (currentQuestion > 8){
            history("/result");
        } else if (selectedAnswer){
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer()
        }else{
            setError("Please select an answer first")
        }
    }

    return (
        <div className="question-container">
            <h1>Question {currentQuestion + 1}</h1>
            <div className="singleQuestion">
                <h2>{questions[currentQuestion].question}</h2>
                <div className="options">
                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <Box >
                        <FormControl >
                            <RadioGroup
                            name="option"
                            aria-labelledby="question-label"
                            >
                                { options && options.map (i => (
                                    <FormControlLabel 
                                    control={<Radio />} 
                                    onChange={ () => handleCheck(i)}
                                    key={i}
                                    label={i} 
                                    value={i}
                                    className={`singleOption ${selectedAnswer && handleSelect(i)}`}
                                    disabled={selectedAnswer}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>

                    </Box>
                </div>

                <div className="controls">
                <Button 
                    variant='contained' 
                    color='secondary' 
                    size='large'
                    href="/"
                    style={{width:185}}
                    onClick={handleExit}>
                        Exit
                </Button>

                <Button 
                variant='contained' 
                    color='primary' 
                    size='large'
                    style={{width:185}}
                    onClick={handleNext}>
                        Next Question
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default Question;