import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Quiz_data from '../Interfaces/Quiz_data.interface';


// const Wrapper = styled.div`
//     border: 6px solid white;
//     border-radius: 12px;
//     width: 50vw;
//     min-height: 500px;
//     padding: 16px;
// `;

const QuestionWrapper = styled.div`
    border: 6px solid white;
    border-radius: 12px;
    width: 50vw;
    min-height: 500px;
    padding: 16px;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const Question = styled.div`
    width: 80%;
    margin: auto;
    text-align: center;
`;

const Label = styled.div`
    font-size: 48px;
    margin-bottom: 24px;
`;

const Input = styled.input`
    width: 300px;
    height: 64px;
    border: none;
    font-family: TitiliumRegular, sans-serif;
    text-align: center;
    padding: 8px;
    border-radius: 5px;
    font-size: 3rem;
`;

const QuestionNumber = styled.div`
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 2rem;
`;

interface Props {
    currentQuestion: Quiz_data | undefined,
    totalQuestions: number | undefined,
    indexCurrentQuestion: number,
    handlePlayerSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void
    handleTimerSubmit: (arg0: string) => void
}

const QuestionCard: React.FC<Props> = ({
    currentQuestion, 
    totalQuestions, 
    indexCurrentQuestion,  
    handlePlayerSubmit,
    handleTimerSubmit
}) =>{

    // Save input value on change, and use a ref to closure its value for the timer
    const [answerInput, setAnswerInput]= useState('');
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setAnswerInput(e.currentTarget.value);
    const answerRef = useRef(answerInput);
    answerRef.current = answerInput;
    
    const inputElement = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        const timer = setTimeout(() =>{
            handleTimerSubmit(answerRef.current); 
            inputElement.current!.value = '';
        }, 10000);

        return () => clearTimeout(timer);
    }, [indexCurrentQuestion]);

    return (
        <QuestionWrapper>
            <QuestionNumber>{indexCurrentQuestion}/{totalQuestions}</QuestionNumber>
            <Question>
                <Label>{currentQuestion?.country.toUpperCase()}</Label>
                <Input 
                    type="text" 
                    ref={inputElement} 
                    onChange={(e)=>{handleOnChange(e)}} 
                    onKeyDown={ (e) => {handlePlayerSubmit(e)}} 
                    autoFocus 
                />
            </Question>
        </QuestionWrapper>
    )
}

export default QuestionCard;