import Exercise from '../models/exercises_model.mjs';


// function / return // was based off conditonals/loops exploration 
// also functions and functional programming exploration

// checks format
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

// Helper functions
function isNameValid(name) {
    return typeof name === 'string' && name.trim() !== '';
}


function isRepsValid(reps) {
    return Number.isInteger(reps) && reps > 0;
}


function isWeightValid(weight) {
    return Number.isInteger(weight) && weight > 0;
}


function isUnitValid(unit) {
    return ['kgs', 'lbs'].includes(unit);
}


const validateExercise = (body) => {
    const { name, reps, weight, unit, date } = body;

    // checks for all of the fields
    const requiredFields = ['name', 'reps', 'weight', 'unit', 'date'];
    const hasAllFields = requiredFields.every(field => body[field] !== undefined);
    const hasExtraFields = Object.keys(body).length > requiredFields.length;

    if (!hasAllFields || hasExtraFields) {
        return { isValid: false, error: "Invalid request" };
    }

    // name
    if (!isNameValid(name)) {
        return { isValid: false, error: "Invalid request" };
    }

    // Validate reps
    if (!isRepsValid(reps)) {
        return { isValid: false, error: "Invalid request" };
    }

    // Validate weight
    if (!isWeightValid(weight)) {
        return { isValid: false, error: "Invalid request" };
    }

    // unit
    if (!isUnitValid(unit)) {
        return { isValid: false, error: "Invalid request" };
    }

    // date format (MM-DD-YY)
    if (!isDateValid(date)) {
        return { isValid: false, error: "Invalid request" };
    }

    return { isValid: true };
};

// following will begin searching for elements ex: ById
// Create a new exercise
export const createExercise = async (req, res) => {
    try {
        const validation = validateExercise(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ Error: validation.error });
        }

        const { name, reps, weight, unit, date } = req.body;
        const newExercise = new Exercise({ name, reps, weight, unit, date });
        await newExercise.save();
        res.status(201).json(newExercise);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// asynchronous code, the following was based off the writing asynchronous code exploration
// export was used over import 
// destructuring and exceptions 

// Retrieve all exercises
export const findExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve a specific exercise by ID
export const findExerciseById = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params._id);
        if (!exercise) {
            return res.status(404).json({ Error: "Not found" });
        }
        res.status(200).json(exercise);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update exercise by ID
export const updateExercise = async (req, res) => {
    try {
        const validation = validateExercise(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ Error: validation.error });
        }

        const updatedExercise = await Exercise.findByIdAndUpdate(
            req.params._id,
            req.body,
            { new: true } 
        );

        if (!updatedExercise) {
            return res.status(404).json({ Error: "Not found" });
        }

        res.status(200).json(updatedExercise);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an exercise by ID
export const deleteExercise = async (req, res) => {
    try {
        const deletedExercise = await Exercise.findByIdAndDelete(req.params._id);
        if (!deletedExercise) {
            return res.status(404).json({ Error: "Not found" });
        }
        res.status(204).end(); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};