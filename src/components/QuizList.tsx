import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Quiz from "../services/Quiz.service";

const QuizListWrapper = styled.div`
    width: 70vw;
    display: flex;
    justify-content: space-around;
`;

const QuizCard = styled(Link)`
    border: 6px solid white;
    border-radius: 12px;
    display: block;
    width: 200px;
    height: 200px;
    text-align: center;
    font-size: 36px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

interface QuizListItem {
    id: number,
    continent: string
}

const QuizList: React.FC = () => {
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
            <QuizListWrapper>
                {quizsList.map(quiz => (
                    <QuizCard key={quiz.id} to={`/quiz/${quiz.continent}`}><div>{quiz.continent.toUpperCase()}</div></QuizCard>                  
                ))}
            </QuizListWrapper>
            )}
        </React.Fragment>
    )
}

export default QuizList;