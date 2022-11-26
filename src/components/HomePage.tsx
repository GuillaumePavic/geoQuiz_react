import React, { useState } from 'react';
import { Link, Navigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const [ difficulty_level, setDifficulty_level ] = useState("");

    if(difficulty_level) {
        return <Navigate to="/quiz" state={{ difficulty_level }}/>
    }

    return (
        <div>
            <div>Règles du jeu</div>
            <div>Pour chaque nom de pays proposé, il faut écrire le nom de la capitale qui correspond et appuyer sur la touche entrée pour valider. Il y a en tout 10 propositions et 15 secondes pour répondre. Petite astuce: ne pas se soucier des accents.</div>
            <div>
                <button onClick={() => { setDifficulty_level("easy") }}>Facile</button>
                <button onClick={() => { setDifficulty_level("medium") }}>Moyen</button>
                <button onClick={() => { setDifficulty_level("difficult") }}>Difficile</button>
            </div>             
        </div>
    )
}

export default HomePage;