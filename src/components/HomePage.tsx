import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import img from '../assets/homePageDark.png';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Start = styled(Link)`
    display: block;
    width: 150px;
    margin: auto;
    text-align: center;
    font-size: 2.5rem;
`;

const Img = styled.img`
    width: 80%;
`;

const HomePage: React.FC = () => {
    return (
        <Wrapper>
            <Img src={img} />
            <Start to={'Quiz'}>Start !</Start>
        </Wrapper>
    )
}

export default HomePage;