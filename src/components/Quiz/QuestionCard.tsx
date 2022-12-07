import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Quiz_data from '../../Interfaces/Quiz_data.interface';


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

const ProgressBarContainer = styled.div`
    width:90%;
    margin: 0 auto;
    margin-top: 20px;
    height:10px;
    border:1px silver solid;
    border-radius:4px;
    background:white;
`;

const ProgressBarKeyframes = keyframes`
    100% { transform: scaleX(0); background:red;}
    50%  { background:orange;}
    0%   { transform: scaleX(1); background:green;}
`;

const ProgressBar = styled.div`
    height:100%;
    text-align:right;
    font:bold 12px arial;
    border-right:1px silver solid;
    border-top-right-radius:4px;
    border-bottom-right-radius:4px;
    line-height:30px;
    color:#444;
    animation: 10s linear 1 ${ProgressBarKeyframes};
`;

interface Props {
    currentQuestion: Quiz_data | undefined,
    totalQuestions: number | undefined,
    indexCurrentQuestion: number,
    handlePlayerSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void
    saveAnswer: (inputValue: string) => void
}

const QuestionCard: React.FC<Props> = ({
    currentQuestion, 
    totalQuestions, 
    indexCurrentQuestion,  
    handlePlayerSubmit,
    saveAnswer
}) =>{
  
    const inputElement = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        
        const timer = setTimeout(() =>{
            saveAnswer(inputElement.current!.value); 
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
                    onKeyDown={ (e) => {handlePlayerSubmit(e)}} 
                    autoFocus 
                />
            <ProgressBarContainer>
                <ProgressBar key={Math.random()}></ProgressBar>
            </ProgressBarContainer>
            </Question>
        </QuestionWrapper>
    )
}

export default QuestionCard;