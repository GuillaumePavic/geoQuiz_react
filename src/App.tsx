import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Leaderboard from './components/Leaderboard';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import styled from 'styled-components';
import Quizs from './components/Quizs';
import Quiz from './components/Quiz';

const Main = styled.main`
  height: calc(100vh - 128px);
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const App: React.FC = () => (
  <React.Fragment>
    <Header/>
    <Main>
      <Routes>
        <Route path="/leaderboard" element={<Leaderboard />}/>
        <Route path="/quiz">
          <Route index element={<Quizs />}/>
          <Route path=':quizId' element={<Quiz/>}/>    
        </Route>
        <Route path="/" element={<HomePage/>}/>
        {/* <Route path="*" element={<NoMatch/>}/> */}
      </Routes>
    </Main>
    <Footer/>
  </React.Fragment>
)

export default App;