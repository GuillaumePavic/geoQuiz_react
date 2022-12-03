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

const NoMatch: React.FC = () =>{
    return (
        <Wrapper>Il n'y a rien ici, vous cherchiez peut-être les <StyledLink to={"/quiz"}>quizs ?</StyledLink></Wrapper>
    )
}

export default NoMatch;