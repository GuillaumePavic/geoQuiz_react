import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Quiz from '../services/Quiz.service';
import styled from "styled-components";
import Answer_Data from "../Interfaces/Answer_data.interface";
import Correction_data from "../Interfaces/Correction_data.interface";
import Leaderboard_data from "../Interfaces/Leaderboard_data.interface";

const Wrapper = styled.div`
    border: 6px solid white;
    border-radius: 12px;
    width: 50vw;
    min-height: 500px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 1.5rem;
`;

const Table = styled.table`
    text-align: center;
    width: 100%
`;

const Score = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    & input {
        font-family: TitiliumRegular, sans-serif;
        text-align: center;
    }
`;

const Button = styled.button`
    font-size: 0.5em;
    padding: 0.25em 1em;
    background: inherit;
    color: white;
    border-radius: 3px;
    &:hover {
        cursor: pointer;
    }
`;

const TR = styled.tr`
    &.right {
        background: green;
    }
    &.wrong {
        background: palevioletred;
    }
`;

interface Props {
    answers: Answer_Data[],
    totalQuestions: number | undefined
}

const Results: React.FC<Props> = ({ answers, totalQuestions }) => {
    const [totalScore, setTotalScore] = useState<number>();
    const [corrections, setCorrections] = useState<Correction_data[]>();
    const [displaySaveScore, setDisplaySaveScore] = useState(false);
    const [scoreSaved, setScoreSaved] = useState(false);

    // Calcul Player Score
    useEffect(()=>{
        const {score, corrections} = Quiz.calculScore(answers);
        setTotalScore(score);
        setCorrections(corrections);
    }, []);

    const handleDisplaySaveInput = (): void => {
        setDisplaySaveScore(true);
    }

    const handleSaveUserName = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if(e.key === 'Enter') {
            const username: string = e.currentTarget.value;
            
            const leaderboardData = {
                username,
                totalScore
            };

            const currentLeaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');

            let newLeaderboard = [
                ...currentLeaderboard,
                leaderboardData
            ];

            // Keep 3 scores only in leaderboard
            if(newLeaderboard.length > 3) {
                newLeaderboard.sort((p1: Leaderboard_data, p2: Leaderboard_data) => {
                    return p2.totalScore - p1.totalScore;
                });
            }
            console.log(newLeaderboard)
            newLeaderboard = newLeaderboard.slice(0, 3);

            localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
            setScoreSaved(true);
        }
    }
    return (
        <React.Fragment>
            { (!totalScore && totalScore !== 0) ? (
                <Wrapper><div>Calcul du Score...</div></Wrapper>  
            ) : (
                <Wrapper>
                <Score>
                    <div> Score: {totalScore}/{totalQuestions}</div>
                    {!displaySaveScore && (<Button onClick={()=>{handleDisplaySaveInput()}}>Enregistrez votre Score ?</Button>)}
                    {displaySaveScore && (
                        <div>
                            {!scoreSaved 
                            ? (<input type="text" placeholder="Entrez votre nom" autoFocus onKeyDown={(e)=>{ handleSaveUserName(e) } }/>) 
                            : (<Link to={"/classement"}>Classement</Link>)}
                        </div>
                    )}
                </Score>
                <Table>
                    <thead>
                        <tr>
                        <th>Pays</th>
                        <th>Capitale</th>
                        <th>Votre réponse</th>
                        </tr>
                    </thead>
                    <tbody>
                        {corrections!.map( (correction: Correction_data) => ( 
                            <TR key={correction.id} className={correction.display}>
                                <td>{correction.country}</td>
                                <td>{correction.capital}</td>
                                <td>{correction.playerAnswer}</td>
                            </TR>                 
                        ) )}
                    </tbody>
                </Table>
                <Link to={"/quiz"}>Nouveau Quiz ?</Link>
                </Wrapper>
            )}
        </React.Fragment>
    )
}

export default Results;

{/* <button>Enregistrez votre Score</button>
<div>
    <input type="text" placeholder="Entrez votre nom" onClick={()=>{ handleUserName(e) }}/>
    <div>Link to Leaderboard</div>
</div> */}