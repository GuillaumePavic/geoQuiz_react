import React, { useState } from "react";
import LevelCard from "./LevelCard";
import QuestionCard from "./QuestionCard";
import Results from "./Results";

export interface Quiz_data {
    id: number,
    country: string,
    capital: string
}

export interface Answer_Data extends Quiz_data {
    playerAnswer: string,
}

const Quiz: React.FC = () => {
    const [ difficultyLevel, setDifficultyLevel ] = useState<string>();
    const [quizData, setQuizData] = useState<Quiz_data[]>();
    const [currentQuestion, setCurrentQuestion] = useState<Quiz_data>();
    const [answers, setAnswers] = useState<Answer_Data[]>([]);
    const [endOfQuiz, setEndOfQuiz] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState<number>();
    const [indexCurrentQuestion, setIndexCurrentQuestion] = useState(1);

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

    const handleChooseClick = (level: string) => {
        console.log(difficultyLevel);
        const data = [
            {id: 1, capital: "Paris", country:"France"},
            {id: 2, capital: "Londres", country:"Royaume-Unis"}
        ]; 
        setQuizData(data);
        setCurrentQuestion(data[0]);
        setTotalQuestions(data.length);
        setDifficultyLevel(level);
    }

    return (
        <React.Fragment>
            {!difficultyLevel ? (
                <LevelCard handleChooseClick={handleChooseClick}/>
            ) : (
                <React.Fragment>

                    {!endOfQuiz && (
                        <QuestionCard 
                            totalQuestions={totalQuestions} 
                            indexCurrentQuestion={indexCurrentQuestion}  
                            currentQuestion={currentQuestion}
                            handleAnswerSubmit={handleAnswerSubmit}
                        />
                    )}

                    {endOfQuiz && (
                        <Results answers={answers} totalQuestions={totalQuestions}/>
                    )}

                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default Quiz;