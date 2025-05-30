import React from 'react';
import ExerciseRow from './ExerciseRow';

// table should display labels 
// extra <th> added at the end for formatting on page
const ExerciseTable = ({ exercises, onDelete }) => {
  return (
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
        {exercises.map((exercise) => (
          <ExerciseRow
            key={exercise._id}
            exercise={exercise}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ExerciseTable;