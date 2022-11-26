import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import quiz, { Quiz_data } from "../services/Quiz"; 
import Results from './Results';

const QuizzPage: React.FC = () => {
    const [current_question, setCurrentQuestion] = useState<Quiz_data>();
    const [current_question_index, setCurrentQuestionIndex] = useState(0);

    // Get difficulty level from Homepage to call API
    const location = useLocation()
    const { difficulty_level } = location.state;

    // Call API
    useEffect(()=>{
        quiz.getData(difficulty_level); //await
        setCurrentQuestion(quiz.quiz_questions[0]);
    }, []);

    // Handle User Input
    const handleAnswerSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(quiz.corrections)
        if (e.key === 'Enter') {
            
            // Get Input Value and save it into quiz
            const current_answer: string = e.currentTarget.value;
            quiz.player_answers.push(current_answer);


            // Change state to next question
            const currentIndex = quiz.quiz_questions.indexOf(current_question!);
            setCurrentQuestion(quiz.quiz_questions[currentIndex + 1]);
            setCurrentQuestionIndex(current_question_index + 1);
            
            // Clean Input
            e.currentTarget.value = '';
        }
    }

    const endOfQuiz = () => {
        if(current_question_index === quiz.total_questions) {
            quiz.calculPlayerScore();
            return true;
        } else {
            return false
        }
    }

    return(
        <div>
            {endOfQuiz() ? (
                <Results corrections={quiz.corrections} playerScore={quiz.player_score} />
            ) : (
                <div>
                <label>{current_question?.country}</label>
                <input type="text" onKeyDown={ (e) => {handleAnswerSubmit(e)}} autoFocus />
                </div>
            )}
        </div>
        
    )
}

export default QuizzPage;