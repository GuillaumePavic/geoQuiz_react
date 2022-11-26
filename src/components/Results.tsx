import { Link } from "react-router-dom";
import { Correction } from "../services/Quiz";

interface Props {
    corrections: Correction[],
    playerScore: number
}

const Results: React.FC<Props> = ({ corrections, playerScore }) => {
    return (
        <div>
            <div>Score: {playerScore}</div>
            <table>
                <thead>
                    <tr>
                    <th>Pays</th>
                    <th>Capitale</th>
                    <th>Votre réponse</th>
                    </tr>
                </thead>
                <tbody>
                    {corrections.map( (correction) => ( 
                        <tr key={correction.id}>
                            <td>{correction.country}</td>
                            <td>{correction.capital}</td>
                            <td>{correction.player_answer}</td>
                        </tr>                 
                    ) )}
                </tbody>
            </table>
            <Link to={"/"}>Nouveau Quiz ?</Link>
        </div>
    )
}

export default Results;