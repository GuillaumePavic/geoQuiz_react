import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Answer_Data } from "./Quiz";
import Quiz from '../services/Quiz.service';

interface Props {
    answers: Answer_Data[],
}


const Results: React.FC<Props> = ({ answers }) => {
    const [totalScore, setTotalScore] = useState<number>();

    // Calcul Player Score
    useEffect(()=>{
        setTotalScore(Quiz.calculScore(answers));
    }, [])

    return (
        <div>
            <div>Score: {totalScore}</div>
            <table>
                <thead>
                    <tr>
                    <th>Pays</th>
                    <th>Capitale</th>
                    <th>Votre réponse</th>
                    </tr>
                </thead>
                <tbody>
                    {answers!.map( (answer: Answer_Data) => ( 
                        <tr key={answer.id}>
                            <td>{answer.country}</td>
                            <td>{answer.capital}</td>
                            <td>{answer.playerAnswer}</td>
                        </tr>                 
                    ) )}
                </tbody>
            </table>
            <Link to={"/"}>Nouveau Quiz ?</Link>
        </div>
    )
}

export default Results;