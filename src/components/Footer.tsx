import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = styled.footer`
    font-size: 2rem;
    display: flex;
    justify-content: flex-end;
    padding: 1rem 2rem;
    position: absolute;
    bottom: 12px;
    width: 100vw;
    height: 64px;
`;

const FooterComponent: React.FC = () => {
    return(
        <Footer>
            <div>
                <Link to={'/classement'}>Classement</Link>
            </div>
        </Footer>
    )
}

export default FooterComponent;