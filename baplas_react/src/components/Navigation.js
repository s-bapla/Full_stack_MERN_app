import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
       <Link to="/CreateExercisePage"> Create Exercise </Link>
    </nav>
  );
}

export default Navigation;