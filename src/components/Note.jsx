function Note({ note, toggleImportance }) {
  const { id, content, important } = note;
  const label = important ? 'Make Not Important' : 'Make Important';

  return (
    <li className="note">
      {content}{' '}
      <button type="button" onClick={() => toggleImportance(id)}>
        {label}
      </button>
    </li>
  );
}

export default Note;
