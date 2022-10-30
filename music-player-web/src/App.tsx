import type { Note } from "interface/Note";
import { useSong } from "hooks";
import { KeyBoard, Selector, SongViewer } from "components";

import "./App.css";

function App() {
  const { notes, setNotes } = useSong();

  function handleKeyboardNoteAdd(note: Note) {
    setNotes((notes) => [...notes, note]);
  }

  function handleAddManualNote(note: string) {
    setNotes((notes) => [...notes, { key: note, length: 1000 }]);
  }

  return (
    <div id="main">
      <h1>Enter some keys</h1>
      <div style={{ display: "flex" }}>
        <KeyBoard
          notes={notes}
          onNotePlayed={handleKeyboardNoteAdd}
          playOnPressed
        />
        <SongViewer notes={notes} />
        <Selector onNoteSelected={handleAddManualNote} />
      </div>
    </div>
  );
}

export default App;
