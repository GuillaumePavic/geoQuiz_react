import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 2.5rem;
    width: 100%;
`;

const StyledLink = styled(Link)`
    text-decoration: underline;
`;

const NoMatchQuiz: React.FC = () => {
    return (
        <Wrapper>
            Ce quiz n&aposexiste pas, vous souhaitez peut-être vous rendre sur la liste des <StyledLink to={'/quiz'}>quizs ?</StyledLink>
        </Wrapper>
    )
}

export default NoMatchQuiz;