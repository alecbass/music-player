import type { Note } from "interface/Note";
import { useSong } from "hooks";
import { KeyBoard, Selector, SongViewer } from "components";

import "./App.css";

function App() {
  const { notes, setNotes, playSong } = useSong();

  function handleKeyboardNoteAdd(note: Note) {
    setNotes((notes) => [...notes, note]);
  }

  function handleAddManualNote(note: string) {
    setNotes((notes) => [...notes, { key: note, length: 1000 }]);
  }

  return (
    <div id="main">
      <h1>Enter some keys</h1>
      <div style={{ display: "flex", height: 400 }}>
        <KeyBoard
          notes={notes}
          onNotePlayed={handleKeyboardNoteAdd}
          playOnPressed
        />
        <SongViewer notes={notes} />
        <Selector onNoteSelected={handleAddManualNote} />
      </div>
      <button onClick={playSong}>Play song</button>
    </div>
  );
}

export default App;
