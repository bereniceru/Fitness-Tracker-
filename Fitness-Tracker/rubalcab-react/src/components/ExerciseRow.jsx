import { HiMiniXMark } from "react-icons/hi2"; // react icons / the delete icon
import { MdEditNote } from "react-icons/md"; // react icons / the edit icon
import { useNavigate } from 'react-router-dom'; // navigation

const ExerciseRow = ({ exercise, onDelete }) => {
  const navigate = useNavigate();
// table rows 
  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{new Date(exercise.date).toLocaleDateString()}</td>
      <td>
        <button onClick={() => navigate(`/edit/${exercise._id}`)}>
          <MdEditNote /> {/* Edit icon */}
        </button>
        <button onClick={() => onDelete(exercise._id)}>
          <HiMiniXMark /> {/* Delete icon */}
        </button>
      </td>
    </tr>
  );
};

export default ExerciseRow;