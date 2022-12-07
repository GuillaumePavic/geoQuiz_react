import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Leaderboard_data from '../Interfaces/Leaderboard_data.interface';

const Wrapper = styled.div`
    border: 6px solid white;
    border-radius: 12px;
    width: 50vw;
    min-height: 500px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    text-align: center;
    font-size: 2rem;
    & h1 {
        font-size: 3rem;
    }

    @media (max-width: 1440px) {
        border: none;
        width: 90vw;
    }
`;

const Table = styled.table`
    width: 70%;
    & thead {
        width: 100%;
    }
    & tbody {
        width: 100%;
    }
    & th{
        width: 50%;
    }
`;

const Leaderboard: React.FC = () => {
    const [leaderboardEmpty, setleaderboardEmpty] = useState(true);
    const [leaderboardData, setLeaderboardData] = useState<Leaderboard_data[]>();

    useEffect(()=>{
        const leaderboard = localStorage.getItem('leaderboard');
        if(leaderboard) {
            const currentLeaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
            setLeaderboardData(currentLeaderboard);
            setleaderboardEmpty(false);
        }
    }, []);

    return (
        <Wrapper>
            <h1>Classement</h1>
            {leaderboardEmpty ? (
                <div>Pas de leader pour l&aposinstant !</div>
            ): (
                <Table>
                    <thead>
                        <tr>
                        <th>Joueur</th>
                        <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData?.map(player => (
                            <tr key={leaderboardData?.indexOf(player)}>
                                <td>{player.username}</td>
                                <td>{player.totalScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Wrapper>
    )
}

export default Leaderboard;