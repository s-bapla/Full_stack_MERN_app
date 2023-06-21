
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'


function CreateExercisePage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        navigate("/");
    }
    return (
        <div>
           <h2>Add Exercise</h2> 
           <input 
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)}/>
            <input 
                type="text"
                placeholder="Enter reps here"
                value={reps}
                onChange={e => setReps(e.target.value)}/>
            <input 
                type="text"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.value)}/>
            <input 
                type="text"
                placeholder="Enter unit here"
                value={unit}
                onChange={e => setUnit(e.target.value)}/>
            <input 
                type="text"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)}/>
            <button
                onClick={addExercise}>Add</button>
        </div>
    );
}

export default CreateExercisePage;