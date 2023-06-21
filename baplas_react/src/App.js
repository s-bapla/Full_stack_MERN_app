import './App.css';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import {useState} from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
            <Route path="/CreateExercisePage" element={<CreateExercisePage/>}></Route>
            <Route path="/EditExercisePage" element={<EditExercisePage exerciseToEdit={exerciseToEdit}/>}></Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
