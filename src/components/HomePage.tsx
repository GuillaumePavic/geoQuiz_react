import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div>
            <div>Homepage</div>
            <Link to={'Quiz'}>Start !</Link>
        </div>
    )
}

export default HomePage;