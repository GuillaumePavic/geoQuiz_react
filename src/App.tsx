import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Leaderboard from './components/Leaderboard';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';


const App: React.FC = () => (
  <React.Fragment>
    <Header/>
    <Routes>
      <Route path="/leaderboard" element={<Leaderboard />}/>
      <Route path="/" element={<HomePage/>}/>
    </Routes>
  </React.Fragment>
)

export default App;
