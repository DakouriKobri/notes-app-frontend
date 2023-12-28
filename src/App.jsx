// NPM Packages
import { useEffect, useState } from 'react';

// Local Files
import Footer from './components/Footer';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes';

function App() {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState('A new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  function hook() {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }
  useEffect(hook, []);

  function toggleImportanceOf(id) {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        const updatedNotes = notes.map((note) =>
          note.id === id ? returnedNote : note
        );
        setNotes(updatedNotes);
      })
      .catch((error) => {
        setErrorMessage(
          `The note "${note.content}" was already deleted from the server`
        );
        setNotes(notes.filter((note) => note.id !== id));
        console.log(error.message);
      });
  }

  function addNote(event) {
    event.preventDefault();

    const newNoteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(newNoteObject).then((returnedNote) => {
      setNotes([...notes, returnedNote]);
      setNewNote('');
    });
  }

  function handleNoteChange(event) {
    setNewNote(event.target.value);
  }

  if (!notes) return null;

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const notesList = notesToShow.map((note) => (
    <Note key={note.id} note={note} toggleImportance={toggleImportanceOf} />
  ));

  return (
    <>
      <div className="mb-8">
        <h1>Notes</h1>
        {errorMessage && <Notification message={errorMessage} />}
        <button onClick={() => setShowAll(!showAll)} type="button">
          Show {showAll ? 'Important' : 'All'}
        </button>
        <ul>{notesList}</ul>

        <form onSubmit={addNote}>
          <input type="text" value={newNote} onChange={handleNoteChange} />
          <button type="submit">Save</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default App;
