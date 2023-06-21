import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const exercises = mongoose.model("exercises", exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new exercises({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
};

const findExercises = async () => {
    const query = exercises.find({});
    return query.exec();
};

const findOneExercise = async (id) => {

    const query = exercises.findById(id);
    return query.exec();
}

const updateOneExercise = async (id, name, reps, weight, unit, date) => {

    const filter = {_id: id};
    const update = {"name": name, "reps": reps, "weight": weight, "unit": unit, "date": date};

    const resultVal = await exercises.updateOne(filter, update);

    if (resultVal.matchedCount === 0){
        return "Not found"
    }
    else {
        return resultVal.modifiedCount
    }
};

const deleteOneExercise = async (id) => {
    const result = await exercises.deleteOne({ _id: id });
    return result.deletedCount;
}

export {createExercise, findExercises, findOneExercise, updateOneExercise, deleteOneExercise}
