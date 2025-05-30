import React, { useEffect, useState } from 'react';
import ExerciseTable from '../components/ExerciseTable';

const HomePage = () => {
  const [exercises, setExercises] = useState([]);

  // the date appears as 2024, it was the date i used for testing
  // Fetch exercises from the server
  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await fetch('/exercises');
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  //  exercise deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/exercises/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted exercise 
        setExercises(exercises.filter((exercise) => exercise._id !== id));
        alert('Exercise deleted successfully!');
      } else {
        alert('Failed to delete exercise.');
      }
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  };

  return (
    <div>
      <h2>Exercise List</h2>
      <ExerciseTable exercises={exercises} onDelete={handleDelete} />
    </div>
  );
};

export default HomePage;