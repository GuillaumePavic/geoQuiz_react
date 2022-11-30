import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Quiz from "../services/Quiz.service";

const QuizList = styled.div`
    width: 70vw;
    display: flex;
    justify-content: space-around;
`;

const QuizCard = styled(Link)`
    border: 6px solid white;
    border-radius: 12px;
    display: block;
    width: 240px;
    height: 240px;
    text-align: center;
    font-size: 48px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

interface QuizListItem {
    id: number,
    continent: string
}

const Quizs: React.FC = () => {
    const [quizsList, setQuizsList] = useState<QuizListItem[]>();

    useEffect(()=>{
        const quizsList = Quiz.listQuizsLocally();
        setQuizsList(quizsList);
    }, []);

    return (
        <React.Fragment>
            {!quizsList ? (
                <div>Loading</div>
            ) : (
            <QuizList>
                {quizsList.map(quiz => (
                    <QuizCard key={quiz.id} to={`/quiz/${quiz.continent}`}><div>{quiz.continent.toUpperCase()}</div></QuizCard>                  
                ))}
            </QuizList>
            )}
        </React.Fragment>
    )
}

export default Quizs;