import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation'; // remember navigation
import './App.css';

const App = () => {
  return (
    <Router>
      <header>
        <h1>Exercise Tracker</h1>
        <Navigation /> {/* included navigation to move between exercise/homepage */}
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateExercisePage />} />
          <Route path="/edit/:id" element={<EditExercisePage />} />
        </Routes>
      </main>
      <footer>
        © 2025 Berenice Rubalcaba
      </footer>
    </Router>
  );
};

export default App;