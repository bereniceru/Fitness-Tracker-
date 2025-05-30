import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditExercisePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({ name: '', reps: 0, weight: 0, unit: 'lbs', date: '' });

  // alerts 
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await fetch(`/exercises/${id}`);
        const data = await response.json();
        setExercise(data);
      } catch (error) {
        console.error('Error fetching exercise:', error);
      }
    };
    fetchExercise();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    // for the date handling <input type="text" /> was used over type="date"
    // 2024-07-18T07:00:00.000Z gets displayed on screen though this is an error only on this page
    // date had issues throughout project
    // updating data // alerts
    try {
      const response = await fetch(`/exercises/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exercise),
      });

      if (response.ok) {
        alert('Exercise updated successfully!');
      } else {
        const errorData = await response.json(); 
        alert(`Failed to update exercise: ${errorData.Error}`); // display the backend error message
      }
      navigate('/');
    } catch (error) {
      console.error('Error updating exercise:', error);
      alert('An error occurred while updating the exercise.');
    }
  };

  return (
    <div>
      <h1>Edit Exercise</h1>
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
              <button type="submit" onClick={handleSubmit}>Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditExercisePage;