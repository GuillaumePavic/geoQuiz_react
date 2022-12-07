import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Quiz from '../../services/Quiz.service';
import styled from 'styled-components';
import Answer_Data from '../../Interfaces/Answer_data.interface';
import Correction_data from '../../Interfaces/Correction_data.interface';
import Leaderboard_data from '../../Interfaces/Leaderboard_data.interface';

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
    font-family: TitiliumRegular, sans-serif;

    @media (max-width: 1440px) {
        border: none;
        width: 90vw;
    }
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

const Total = styled.div`
    font-size: 2.5rem;
    margin-bottom: 6px;
`;

const Button = styled.button`
    color: palevioletred;
    font-family: TitiliumRegular, sans-serif;
    font-size: 0.5em;
    padding: 0.25em 1em;
    border: 1px solid palevioletred;
    border-radius: 3px;
    &:hover {
        cursor: pointer;
    }
`;

const StyledLink = styled(Link)`
    font-family: TitiliumRegular, sans-serif;
`;

const TR = styled.tr`
    &.right {
        background: #6ad46a;
    }
    &.wrong {
        background: #db7093;
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
                    <Total> Score: {totalScore}/{totalQuestions}</Total>
                    {!displaySaveScore && (<Button onClick={()=>{handleDisplaySaveInput()}}>Enregistrez votre Score ?</Button>)}
                    {displaySaveScore && (
                        <div>
                            {!scoreSaved 
                            ? (<input type='text' maxLength={21} placeholder='Entrez votre nom' autoFocus onKeyDown={(e)=>{ handleSaveUserName(e) } }/>) 
                            : (<Button><StyledLink to={'/classement'}>Classement ?</StyledLink></Button>)}
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
                        {corrections?.map( (correction: Correction_data) => ( 
                            <TR key={correction.id} className={correction.display}>
                                <td>{correction.country}</td>
                                <td>{correction.capital}</td>
                                <td>{correction.playerAnswer}</td>
                            </TR>                 
                        ) )}
                    </tbody>
                </Table>
                <Button><StyledLink to={'/quiz'}>Nouveau Quiz ?</StyledLink></Button> 
                </Wrapper>
            )}
        </React.Fragment>
    )
}

export default Results;