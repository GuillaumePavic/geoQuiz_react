import React, { useState } from 'react';
import LevelCard from './LevelCard';
import QuestionCard from './QuestionCard';
import Results from './Results';
import QuizServices from '../../services/Quiz.service';
import { useNavigate, useParams } from 'react-router-dom';
import Answer_Data from '../../Interfaces/Answer_data.interface';
import Quiz_data from '../../Interfaces/Quiz_data.interface';

const Quiz: React.FC = () => {
    // Choose Level
    const [difficultyLevel, setDifficultyLevel] = useState<string>();
    // Quiz
    const [totalQuestions, setTotalQuestions] = useState<number>();
    const [quizData, setQuizData] = useState<Quiz_data[]>();
    const [currentQuestion, setCurrentQuestion] = useState<Quiz_data>();
    const [indexCurrentQuestion, setIndexCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState<Answer_Data[]>([]);
    const [endOfQuiz, setEndOfQuiz] = useState(false);

    // Choose Level and set data for Quiz
    const { quizId } = useParams();
    const navigate = useNavigate();
    const handleChooseClick = (level: string) => {
        const data = QuizServices.createQuizLocally(level, quizId!);
        if(!data.length) {
            navigate('/noquiz')
        }
        setQuizData(data);
        setCurrentQuestion(data[0]);
        setTotalQuestions(data.length);
        setDifficultyLevel(level);
    }

    // Quiz
    const saveAnswer = (currentAnswer: string) => {
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

    const handlePlayerSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const currentAnswer = e.currentTarget.value;
            saveAnswer(currentAnswer);
            e.currentTarget.value = '';
        }
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
                            handlePlayerSubmit={handlePlayerSubmit}
                            saveAnswer={saveAnswer}
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