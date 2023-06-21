import React from 'react';
import ExerciseTable from '../components/ExerciseTable.js'
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

function HomePage({setExerciseToEdit}) {
    const [exercise, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercisesData = await response.json();
        setExercises(exercisesData);
    };

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
        const getResponse = await fetch('/exercises');
        const exercises = await getResponse.json();
        setExercises(exercises);
        } else {
        console.error(`Failed to delete movie with id = ${_id}, status code = ${response.status}`)
        }
    }

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate('/EditExercisePage');
    };


    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <div>
           <h2>This is the Homepage </h2> 
           <ExerciseTable exercises={exercise} onDelete = {onDelete} onEdit ={onEdit}/>
        </div>
    )
}

export default HomePage;