import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import * as exercises from './controllers/exercises_controller.mjs';

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECT_STRING)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// routes
app.post('/exercises', exercises.createExercise);
app.get('/exercises', exercises.findExercises);
app.get('/exercises/:_id', exercises.findExerciseById);
app.put('/exercises/:_id', exercises.updateExercise);
app.delete('/exercises/:_id', exercises.deleteExercise);

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});