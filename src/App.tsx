import { Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import Leaderboard from './components/Leaderboard';
import Quizz from './components/Quizz';


const App: React.FC = () => (
  <Routes>
    <Route path="/leaderboard" element={<Leaderboard />}/>
    <Route path="/quizz" element={<Quizz />}/>
    <Route path="/" element={<HomePage />}/>  
  </Routes>
)

export default App;
