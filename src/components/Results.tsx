import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Answer_Data } from "./Quiz";
import Quiz from '../services/Quiz.service';
import styled from "styled-components";

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 1.5rem;
`;

const Score = styled.div`

`;

const Table = styled.table`
    text-align: center;
    width: 100%
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

export interface Correction extends Answer_Data {
    display?: string;
}

const Results: React.FC<Props> = ({ answers, totalQuestions }) => {
    const [totalScore, setTotalScore] = useState<number>();
    const [corrections, setCorrections] = useState<Correction[]>();

    // Calcul Player Score
    useEffect(()=>{
        const {score, corrections} = Quiz.calculScore(answers);
        setTotalScore(score);
        setCorrections(corrections);
    }, []);

    return (
        <React.Fragment>
            { (!totalScore && totalScore !== 0) ? (
                <Wrapper><div>Check results</div></Wrapper>  
            ) : (
                <Wrapper>
                <Score>Score: {totalScore}/{totalQuestions}</Score>
                <Table>
                    <thead>
                        <tr>
                        <th>Pays</th>
                        <th>Capitale</th>
                        <th>Votre réponse</th>
                        </tr>
                    </thead>
                    <tbody>
                        {corrections!.map( (correction: Correction) => ( 
                            <TR key={correction.id} className={correction.display}>
                                <td>{correction.country}</td>
                                <td>{correction.capital}</td>
                                <td>{correction.playerAnswer}</td>
                            </TR>                 
                        ) )}
                    </tbody>
                </Table>
                <Link to={"/"}>Nouveau Quiz ?</Link>
                </Wrapper>
            )}
        </React.Fragment>
    )
}

export default Results;

// background: ${props => {
//     if(props['data-display'] === "wrong") return "palevioletred";
//     if(props['data-display'] === "right") return "green";
// }};