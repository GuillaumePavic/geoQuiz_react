import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    border: 6px solid white;
    border-radius: 12px;
    width: 50vw;
    min-height: 500px;
    padding: 16px;
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    & p {
        line-height: 36px;
        font-size: 1.2em;
    }
`;

const Button = styled.button`
    color: palevioletred;
    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    &:hover {
        cursor: pointer;
    }
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
`;

interface Props {
    handleChooseClick: (level: string) => void
}


const LevelCard: React.FC<Props> = ({ handleChooseClick }) => {
    return (
    <Wrapper>
        <p>Pour chaque nom de pays, donnez le nom de la capitale et appuyer sur la touche entrée pour valider. </p>
        <Buttons>
            <Button onClick={() => { handleChooseClick('easy') }}>Facile</Button>
            <Button onClick={() => { handleChooseClick('medium') }}>Moyen</Button>
            <Button onClick={() => { handleChooseClick('difficult') }}>Difficile</Button>
        </Buttons>             
        <p>Attention au temps. Petite astuce: ne pas se soucier des accents et des majuscules.</p>
    </Wrapper>
    )
}

export default LevelCard;