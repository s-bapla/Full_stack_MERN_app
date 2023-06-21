import 'dotenv/config';
import * as exercises from './model.mjs';
import express from 'express';
import asyncHandler from 'express-async-handler';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());


app.post('/exercises', asyncHandler (async (req, res) => {
    
    let count = 0

    req.body.reps = Number(req.body.reps)
    req.body.weight = Number(req.body.weight)

    for (let key in req.body){
        if (req.body.hasOwnProperty(key))
            count++;
    }

    function isDateValid(date) {
        const format = /^\d\d-\d\d-\d\d$/;
        return format.test(date);
    }

    if (count == 5 && typeof(req.body.name) === "string" && req.body.name.length > 0 && typeof(req.body.reps) === "number" && req.body.reps > 0 && typeof(req.body.weight) === "number" && req.body.weight > 0 && typeof(req.body.unit) === "string" && (req.body.unit === "kgs" || req.body.unit === "lbs") && typeof(req.body.date) === "string" && isDateValid(req.body.date)){
        const exercise = await exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date);   
        res.status(201).json(exercise);
    }
    else{
        res.status(400).json({Error: "invalid request"});
    }
}));

app.get('/exercises', asyncHandler (async (req, res) => {

    const allExercises = await exercises.findExercises()
    res.status(200).send(allExercises);
}));

app.get('/exercises/:_id', asyncHandler (async (req, res) => {

    const exerciseId = req.params._id;
    const oneExercise = await exercises.findOneExercise(exerciseId);
    if (oneExercise !== null){
        res.status(200).send(oneExercise);
    }
    else {
        res.status(404).json({Error: 'Not Found'});
    }
}));



app.put('/exercises/:_id', asyncHandler (async (req, res) => {
    const exerciseId = req.params._id;
    let count = 0
    req.body.reps = Number(req.body.reps);
    req.body.weight = Number(req.body.weight);

    for (let key in req.body){
        if (req.body.hasOwnProperty(key))
            count++;
    }

    function isDateValid(date) {
        const format = /^\d\d-\d\d-\d\d$/;
        return format.test(date);
    }

    if (count == 5 && typeof(req.body.name) === "string" && req.body.name.length > 0 && typeof(req.body.reps) === "number" && req.body.reps > 0 && typeof(req.body.weight) === "number" && req.body.weight > 0 && typeof(req.body.unit) === "string" && (req.body.unit === "kgs" || req.body.unit === "lbs") && typeof(req.body.date) === "string" && isDateValid(req.body.date)){
        const result = await exercises.updateOneExercise(exerciseId, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date);
        const oneExercise = await exercises.findOneExercise(exerciseId);
        if (result === "Not found"){
            res.status(404).send({ Error: result });
        }
        else {
            res.status(200).json(oneExercise);
        }
    }
    else {
        res.status(400).json({Error: "Invalid request"})
    }
}));

/**
 * Delete the movie whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', asyncHandler (async (req, res) => {
    
    const result = await exercises.deleteOneExercise(req.params._id);

    if (result === 1){
        res.status(204).send();
    }
    else {
        res.status(404).json({ Error: "Not found" });
    }
}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});