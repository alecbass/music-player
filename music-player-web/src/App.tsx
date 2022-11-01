import type { Note } from "interface/Note";
import { useSong, useWasm } from "hooks";
import { KeyBoard, Selector, SongViewer } from "components";
import { eightMelodiesMapped } from "components/const";
import "./App.css";

function App() {
  const { notes, setNotes, playSong } = useSong();
  const wasm = useWasm();

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
      <button disabled={!notes.length} onClick={playSong}>
        Play song
      </button>
      <h3>Selections</h3>
      <button onClick={() => setNotes(eightMelodiesMapped)}>
        Eight Melodies (Earthbound Beginnings)
      </button>
      <h3>Coming soon...</h3>
      <span>Harmony - Runescape</span>
      <span>Feel free to tell me some ideas lol</span>
      <button onClick={() => wasm.greet("hehe")}>Say hello</button>
    </div>
  );
}

export default App;
