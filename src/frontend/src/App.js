import logo from './logo.svg';
import './App.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {TeamPage} from './pages/TeamPage';
import MatchPage from './pages/MatchPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
      <Route path='/teams/:teamName' Component={TeamPage} />
      <Route path='/' Component={HomePage} />
      <Route path='/teams/:teamName/matches/:year' Component={MatchPage} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
