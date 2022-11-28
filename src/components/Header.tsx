import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
    height: 64px;
    width: 100vw;
    padding: 1rem 2rem;
    font-size: 1.5em;  
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    `;

const HeaderComponent: React.FC = () => {
    return(
        <Header>
        <Link to={'/'}>
            <Logo>
                <h1>GeoQuiz</h1>
            </Logo>
        </Link>
        </Header>

    )
}

export default HeaderComponent;