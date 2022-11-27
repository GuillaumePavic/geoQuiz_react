import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Results from "./Results";

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

    useEffect(()=>{
        console.log(difficultyLevel);
        const data = [
            {id: 1, capital: "Paris", country:"France"},
            {id: 2, capital: "Londres", country:"Royaume-Unis"}
        ]; 
        setQuizData(data);
        setCurrentQuestion(data[0]);
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
            
            // Clean Input
            e.currentTarget.value = '';
        }
    }

    return (
        <div>
            {endOfQuiz ? (
                <Results answers={answers} />
            ) : (
                <div>
                    <label>{currentQuestion?.country}</label>
                    <input type="text" onKeyDown={ (e) => {handleAnswerSubmit(e)}} autoFocus />
                </div>
            )}
        </div>
    )
}

export default Quiz;