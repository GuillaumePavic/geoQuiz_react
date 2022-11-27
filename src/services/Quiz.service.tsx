import { Answer_Data, Quiz_data } from "../components/Quiz";

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
        console.log("calculScore =>", answers)
        let score = 0;
        for(let answer of answers) {
            if(answer.playerAnswer.trim().toLowerCase() === answer.capital.trim().toLocaleLowerCase()) {
                score++;
            }
        }
        return score;
    }
}