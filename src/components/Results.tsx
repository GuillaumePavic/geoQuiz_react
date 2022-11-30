import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Quiz from '../services/Quiz.service';
import styled from "styled-components";
import Answer_Data from "../models/Answer_data.interface";
import Correction_data from "../models/Correction_data.interface";

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
                <div>Score: {totalScore}/{totalQuestions}</div>
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
                {/* <button>Click</button> */}
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