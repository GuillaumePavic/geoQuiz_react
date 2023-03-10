import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Quiz_data from '../../Interfaces/Quiz_data.interface';

const QuestionWrapper = styled.div`
    border: 6px solid white;
    border-radius: 12px;
    width: 50vw;
    min-height: 500px;
    padding: 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    
    @media (max-width: 1440px) {
        border: none;
        width: 90vw;
    }

    @media (max-width: 425px) {
        font-size: 32px;
    }
`;

const Label = styled.div`
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
    font-size: 36px;

    @media (max-width: 425px) {
        width: 150px;
        height: 64px;
        font-size: 24px;
    }
`;

const QuestionNumber = styled.div`
    position: absolute;
    top: 12px;
    right: 12px;
    
    @media (max-width: 1440px) {
        position: relative;
    }
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
        </QuestionWrapper>
    )
}

export default QuestionCard;