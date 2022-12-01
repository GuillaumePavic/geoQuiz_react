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
    handleAnswerSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void
    handleAnswerTimer: (arg0: string) => void
}

const QuestionCard: React.FC<Props> = ({
    currentQuestion, 
    totalQuestions, 
    indexCurrentQuestion,  
    handleAnswerSubmit,
    handleAnswerTimer
}) =>{

    // const answerInput = useRef(null);
    const [answerInput, setAnswerInput]= useState('');
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswerInput(e.currentTarget.value);
    };

    const answerRef = useRef(answerInput);
    answerRef.current = answerInput;

    useEffect(()=>{
        const timer = setTimeout(() =>{
            handleAnswerTimer(answerRef.current); 
            setAnswerInput('')
        }, 3000);

        return () => clearTimeout(timer);
    }, [indexCurrentQuestion]);

    return (
        <QuestionWrapper>
            <QuestionNumber>{indexCurrentQuestion}/{totalQuestions}</QuestionNumber>
            <Question>
                <Label>{currentQuestion?.country.toUpperCase()}</Label>
                <Input value={answerInput} onChange={(e)=>{handleOnChange(e)}} type="text" onKeyDown={ (e) => {handleAnswerSubmit(e)}} autoFocus />
            </Question>
        </QuestionWrapper>
    )
}

export default QuestionCard;