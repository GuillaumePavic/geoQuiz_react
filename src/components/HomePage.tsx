import React, { useState } from 'react';
import styled from 'styled-components';
import Quiz from './Quiz';

const Wrapper = styled.div`
    border: 6px solid white;
    border-radius: 12px;
    width: 50vw;
    min-height: 500px;
    padding: 16px;
`;

const ChooseDifficulty = styled.div`
    font-size: 1.5rem;
    height: 100%;
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

const HomePage: React.FC = () => {
    const [ difficultyLevel, setDifficultyLevel ] = useState<string>();

    return (
        <Wrapper>
            {!difficultyLevel ? (

            <ChooseDifficulty>
                <p>Pour chaque nom de pays, donnez le nom de la capitale et appuyer sur la touche entrée pour valider. </p>
                <Buttons>
                    <Button onClick={() => { setDifficultyLevel("easy") }}>Facile</Button>
                    <Button onClick={() => { setDifficultyLevel("medium") }}>Moyen</Button>
                    <Button onClick={() => { setDifficultyLevel("difficult") }}>Difficile</Button>
                </Buttons>             
                <p>Attention au temps. Petite astuce: ne pas se soucier des accents et des majuscules.</p>
            </ChooseDifficulty>

            ) : (

            <Quiz difficultyLevel={difficultyLevel} />
            
            )}

        </Wrapper>
    )
}

export default HomePage;