import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Results from "./Results";

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
`;

const QuestionCard = styled.div`
    height: 100%;
    width: 100%;
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
    difficultyLevel: string
}

export interface Quiz_data {
    id: number,
    country: string,
    capital: string
}

export interface Answer_Data extends Quiz_data {
    playerAnswer: string,
}

const Quiz: React.FC<Props> = ({ difficultyLevel }) => {
    const [quizData, setQuizData] = useState<Quiz_data[]>();
    const [currentQuestion, setCurrentQuestion] = useState<Quiz_data>();
    const [answers, setAnswers] = useState<Answer_Data[]>([]);
    const [endOfQuiz, setEndOfQuiz] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState<number>();
    const [indexCurrentQuestion, setIndexCurrentQuestion] = useState(1);

    useEffect(()=>{
        console.log(difficultyLevel);
        const data = [
            {id: 1, capital: "Paris", country:"France"},
            {id: 2, capital: "Londres", country:"Royaume-Unis"}
        ]; 
        setQuizData(data);
        setCurrentQuestion(data[0]);
        setTotalQuestions(data.length);
    }, []);

    // Handle User Input
    const handleAnswerSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            
            // Get Input Value
            const currentAnswer: string = e.currentTarget.value;
            const answerData: Answer_Data = {
                ...currentQuestion!,
                playerAnswer: currentAnswer
            };

            setAnswers([
                ...answers,
                answerData
            ]);

            // Change state to next question or end quiz
            const currentIndex = quizData?.indexOf(currentQuestion!);
            if(currentIndex === quizData!.length - 1)  return setEndOfQuiz(true);
            setCurrentQuestion(quizData![currentIndex! + 1]);
            setIndexCurrentQuestion(prev => prev + 1);
            
            // Clean Input
            e.currentTarget.value = '';
        }
    }

    return (
        <Wrapper>
            {endOfQuiz ? (
                <Results answers={answers} totalQuestions={totalQuestions}/>
            ) : (
                <QuestionCard>
                    <QuestionNumber>{indexCurrentQuestion}/{totalQuestions}</QuestionNumber>
                    <Question>
                        <Label>{currentQuestion?.country.toUpperCase()}</Label>
                        <Input type="text" onKeyDown={ (e) => {handleAnswerSubmit(e)}} autoFocus />
                    </Question>
                </QuestionCard>
            )}
        </Wrapper>
    )
}

export default Quiz;