import React, { useState } from "react";
import LevelCard from "./LevelCard";
import QuestionCard from "./QuestionCard";
import Results from "./Results";
import QuizServices from "../services/Quiz.service";
import { useParams } from 'react-router-dom';
import Answer_Data from "../Interfaces/Answer_data.interface";
import Quiz_data from "../Interfaces/Quiz_data.interface";

const Quiz: React.FC = () => {
    const [difficultyLevel, setDifficultyLevel] = useState<string>();
    const [totalQuestions, setTotalQuestions] = useState<number>();
    const [quizData, setQuizData] = useState<Quiz_data[]>();
    const [currentQuestion, setCurrentQuestion] = useState<Quiz_data>();
    const [indexCurrentQuestion, setIndexCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState<Answer_Data[]>([]);
    const [endOfQuiz, setEndOfQuiz] = useState(false);

    // Choose Level
    let { quizId } = useParams();
    const handleChooseClick = (level: string) => {
        const data = QuizServices.createQuizLocally(level, quizId!);
        setQuizData(data);
        setCurrentQuestion(data[0]);
        setTotalQuestions(data.length);
        setDifficultyLevel(level);
    }

    const handleAnswer = (currentAnswer: string) => {
        const answerData: Answer_Data = {
            ...currentQuestion!,
            playerAnswer: currentAnswer
        };

        setAnswers([...answers, answerData]);

        // Change state to next question or end quiz
        const currentIndex = quizData?.indexOf(currentQuestion!);
        if(currentIndex === quizData!.length - 1)  return setEndOfQuiz(true);
        setCurrentQuestion(quizData![currentIndex! + 1]);
        setIndexCurrentQuestion(prev => prev + 1);
    }

    // Handle User Input
    const handleAnswerSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            
            // Get Input Value
            const currentAnswer: string = e.currentTarget.value;
            handleAnswer(currentAnswer);
            
            // Clean Input
            e.currentTarget.value = '';
        }
    }

    const handleAnswerTimer = (currentAnswer: string) => {
        const origine = "timer"
        handleAnswer(currentAnswer);
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
                            handleAnswerTimer={handleAnswerTimer}
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