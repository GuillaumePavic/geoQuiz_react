export interface Quiz_data {
    id: number,
    country: string,
    capital: string
}

export interface Correction extends Quiz_data {
    player_answer: string,
    class: string
}

export class Quiz {
    // Faire Types
    // level: string;
    total_questions = 2;
    quiz_questions: Quiz_data[] = [];
    player_answers: string[] = [];
    corrections: Correction[] = [];
    player_score = 0;

    getData(level: string) {
        const data: Quiz_data[] = [
            {id: 1, capital: "Paris", country:"France"},
            {id: 2, capital: "Londres", country:"Royaume-Unis"},
            // {id: 3, capital: "Berlin", country:"Allemagne"}
        ];

        this.quiz_questions = data;
    }

    calculPlayerScore() {
        let score = 0;

        for(let i = 0; i < this.total_questions; i++) {
            const correction: Correction = {
                id: this.quiz_questions[i].id,
                country: this.quiz_questions[i].country,
                capital: this.quiz_questions[i].capital,
                player_answer: this.player_answers[i],
                class: "false"
            }

            if(correction.player_answer.trim().toLowerCase() === correction.capital.trim().toLocaleLowerCase()) {
                score++;
                correction.class = "true";
                this.corrections.push(correction);
            } else {
                this.corrections.push(correction);
            }
        }

        this.player_score = score;
    }
}

export default new Quiz();