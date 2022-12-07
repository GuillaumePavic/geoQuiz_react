import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Leaderboard from './components/Leaderboard';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import styled from 'styled-components';
import QuizList from './components/Quiz/QuizList';
import Quiz from './components/Quiz/Quiz';
import NoMatch from './components/NoMatch';
import NoMatchQuiz from './components/NoMatchQuiz';

const Main = styled.main`
  height: calc(100vh - 128px);
  width: 100%;
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
        <Route path="/classement" element={<Leaderboard />}/>
        <Route path="/quiz">
          <Route index element={<QuizList />}/>
          <Route path=':quizId' element={<Quiz/>}/>
        </Route>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/noquiz' element={<NoMatchQuiz/>}/> 
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
    </Main>
    <Footer/>
  </React.Fragment>
)

export default App;