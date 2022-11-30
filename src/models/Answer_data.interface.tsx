import Quiz_data from "./Quiz_data.interface";

export default interface Answer_data extends Quiz_data {
    playerAnswer: string,
}