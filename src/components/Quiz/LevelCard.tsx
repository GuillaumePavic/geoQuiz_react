import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    border: 6px solid white;
    border-radius: 12px;
    width: 50vw;
    min-height: 500px;
    padding: 16px;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    & p {
        line-height: 36px;
        font-size: 1.2em;
    }

    @media (max-width: 1440px) {
        border: none;
        width: 90vw;
    }

    @media (max-width: 425px) {
        font-size: 16px;
    }
`;

const Button = styled.button`
    color: palevioletred;
    font-size: 24px;
    width: 120px;
    height: 50px;
    border: 2px solid palevioletred;
    border-radius: 3px;
    &:hover {
        cursor: pointer;
    }

    @media (max-width: 425px) {
        margin: 16px auto;
        font-size: 16px;
    }
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;

    @media (max-width: 425px) {
        flex-direction: column;
    }
`;

interface Props {
    handleChooseClick: (level: string) => void
}


const LevelCard: React.FC<Props> = ({ handleChooseClick }) => {
    return (
    <Wrapper>
        <p>Pour chaque nom de pays, donnez le nom de la capitale et appuyer sur la touche entrée pour valider. </p>
        <Buttons>
            <Button onClick={() => { handleChooseClick('easy') }}><div>Facile</div></Button>
            <Button onClick={() => { handleChooseClick('medium') }}><div>Moyen</div></Button>
            <Button onClick={() => { handleChooseClick('difficult') }}><div>Difficile</div></Button>
        </Buttons>             
        <p>Attention au temps. Petite astuce: ne pas se soucier des accents et des majuscules.</p>
    </Wrapper>
    )
}

export default LevelCard;