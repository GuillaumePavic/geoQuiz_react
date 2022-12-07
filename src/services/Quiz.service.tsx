import data from '../data/data.json';
import Answer_data from '../Interfaces/Answer_data.interface';
import Correction_data from '../Interfaces/Correction_data.interface';
import Quiz_data from '../Interfaces/Quiz_data.interface';

export default class Quiz {

    static calculScore = (answers: Answer_data[]) => {
        const corrections: Correction_data[] = [...answers];
        let score = 0;

        const cleanedText = (arg: string) => {
            const cleanedText = arg.trim().toLowerCase().replace(/é|è|ê|ë/g, 'e').replace(/-| /, '');
            
            return cleanedText;
        }

        for(const correction of corrections) {
            // if(correction.playerAnswer.trim().toLowerCase() === correction.capital.trim().toLowerCase()) {
            if(cleanedText(correction.playerAnswer) === cleanedText(correction.capital)) {
                score++;
                correction.display = 'right';
            } else {
                correction.display = 'wrong';
            }
        }  
        return {score, corrections};
    }

    static listQuizsLocally = () => {
        const categories = [
            {id: 1, continent: 'asie'},
            {id: 2, continent: 'europe'},
            {id: 3, continent: 'afrique'},
            {id: 4, continent: 'amerique'},
            {id: 5, continent: 'monde'}
        ];

        return categories;
    }

    static createQuizLocally = (level: string, category: string): Quiz_data[] => {
        const n = 3;

        // TODO: type data
        let filteredData;
        if(category === 'monde') {
            filteredData = data.filter(el => el.level === level);
        } else{
            filteredData = data.filter(el => el.level === level && el.continent === category);
        }

        let randomizedData = [...filteredData].sort(() => 0.5 - Math.random());
        randomizedData = randomizedData.slice(0, n);
        
        const formattedData: Quiz_data[] = randomizedData.map(el => {
            return {
                id: el.id, 
                country: el.country, 
                capital: el.capital               
            }
        });

        return formattedData;
    }
}