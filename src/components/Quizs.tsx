import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom"


const Quizs: React.FC = () => {
    return (
        <div>
            <div>Make Quiz List</div>
            <Link to={'/quiz/1'}>Quiz1</Link>
        </div>
    )
}

export default Quizs;