import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateExercisePage = () => {
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({ name: '', reps: 0, weight: 0, unit: 'lbs', date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    // checks date format similarily to the edit exercise page
    fetch('/exercises', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exercise),
    })
      .then((response) => {
        if (response.ok) {
          alert('Exercise created successfully!');
          navigate('/');
        } else {
          const errorData = response.json(); 
          alert(`Failed to create exercise: ${errorData.Error}`); //  backend error message
        }
      })
      .catch((error) => console.error('Error creating exercise:', error));
  };

  return (
    <div>
      <h1>Create Exercise</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Unit</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                value={exercise.name}
                onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
              />
            </td>
            <td>
              <input
                type="number"
                value={exercise.reps}
                onChange={(e) => setExercise({ ...exercise, reps: e.target.value })}
              />
            </td>
            <td>
              <input
                type="number"
                value={exercise.weight}
                onChange={(e) => setExercise({ ...exercise, weight: e.target.value })}
              />
            </td>
            <td>
              <select
                value={exercise.unit}
                onChange={(e) => setExercise({ ...exercise, unit: e.target.value })}
              >
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                placeholder="MM-DD-YY"
                value={exercise.date}
                onChange={(e) => setExercise({ ...exercise, date: e.target.value })}
              />
            </td>
            <td>
              <button type="submit" onClick={handleSubmit}>Add Exercise</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CreateExercisePage;