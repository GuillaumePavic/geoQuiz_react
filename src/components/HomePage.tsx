import React, { useState } from 'react';
import Quiz from './Quiz';


const HomePage: React.FC = () => {
    const [ difficultyLevel, setDifficultyLevel ] = useState<string>();

    return (
        <div>
            {difficultyLevel ? (
            <Quiz difficultyLevel={difficultyLevel} />
            ) : (
            <div>
                <div>Règles du jeu</div>
                <div>Pour chaque nom de pays proposé, il faut écrire le nom de la capitale qui correspond et appuyer sur la touche entrée pour valider. Il y a en tout 10 propositions et 15 secondes pour répondre. Petite astuce: ne pas se soucier des accents.</div>
                <div>
                    <button onClick={() => { setDifficultyLevel("easy") }}>Facile</button>
                    <button onClick={() => { setDifficultyLevel("medium") }}>Moyen</button>
                    <button onClick={() => { setDifficultyLevel("difficult") }}>Difficile</button>
                </div>             
            </div>
            )}
        </div>
    )
}

export default HomePage;