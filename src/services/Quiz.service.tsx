import { Answer_Data, Quiz_data } from "../components/Quiz";
import { Correction } from "../components/Results";


export default class Quiz {

    static getData(level: string) {
        const data: Quiz_data[] = [
            {id: 1, capital: "Paris", country:"France"},
            {id: 2, capital: "Londres", country:"Royaume-Unis"},
            // {id: 3, capital: "Berlin", country:"Allemagne"}
        ];

        return data;
    }

    static calculScore = (answers: Answer_Data[]) => {
        const corrections: Correction[] = [...answers];
        let score = 0;
        for(let correction of corrections) {
            if(correction.playerAnswer.trim().toLowerCase() === correction.capital.trim().toLocaleLowerCase()) {
                score++;
                correction.display = "right";
            } else {
                correction.display = "wrong";
            }
        }  
        return {score, corrections};
    }
}