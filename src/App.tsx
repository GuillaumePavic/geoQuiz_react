import { Routes, Route} from 'react-router-dom';
import Leaderboard from './components/Leaderboard';
import QuizzPage from './components/QuizPage';
import Header from './components/Header';
import Footer from './components/Footer';
import React from 'react';
import HomePage from './components/HomePage';


const App: React.FC = () => (
  <React.Fragment>
    <Header/>
    <Routes>
      <Route path="/quiz" element={<QuizzPage />}/>
      <Route path="/leaderboard" element={<Leaderboard />}/>
      <Route path="/" element={<HomePage/>}/>
    </Routes>
  </React.Fragment>
)

export default App;
