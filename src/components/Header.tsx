import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
    height: 64px;
    width: 100vw;
    padding: 6px 32px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media (max-width: 425px) {
        justify-content: center;
    }
`;

const Logo = styled.div`
    font-size: 24px;
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