import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 32px;
    width: 90vw;

    @media (max-width: 425px) {
        font-size: 16px;
        height: 500px;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: underline;
`;

const NoMatchQuiz: React.FC = () => {
    return (
        <Wrapper>
            Ce quiz n&apos;existe pas, vous souhaitez peut-être vous rendre sur la liste des <StyledLink to={'/quiz'}>quizs ?</StyledLink>
        </Wrapper>
    )
}

export default NoMatchQuiz;