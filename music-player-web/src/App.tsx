import type { Note } from "interface/Note";
import { useAudio, useSong, useWasm } from "hooks";
import { KeyBoard, Selector, SongViewer, Intro } from "components";
import { eightMelodiesMapped, noteToMidi } from "components/const";
import "./App.css";

function App() {
  // Null if check has not been finalised, otherwise true
  const { hasPermission, requestPermission } = useAudio();
  const { notes, setNotes, playSong } = useSong();
  const wasm = useWasm();

  function handleKeyboardNoteAdd(note: Note) {
    setNotes((notes) => [...notes, note]);
    // TODO(alec): Got a result of midly here
    const result = wasm.on_note(
      1,
      noteToMidi[note.key as keyof typeof noteToMidi]
    );
    console.debug(result);
  }

  function handleAddManualNote(note: string) {
    setNotes((notes) => [...notes, { key: note, length: 1000 }]);
  }

  function doWasmStuff() {
    wasm.start("hi");
    return;
    // const r = wasm.start("hehehe");
    console.debug(
      wasm.on_note(
        1,
        noteToMidi[eightMelodiesMapped[5].key as keyof typeof noteToMidi]
      )
    );

    const hehe = wasm.combine_all_notes(
      1,
      new Uint8Array(
        notes.map((n) => noteToMidi[n.key as keyof typeof noteToMidi])
      )
    );

    const file = new File(
      [new Blob([hehe.buffer], { type: "audio/midi" })],
      "test.mid"
    );
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
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
      <button onClick={doWasmStuff}>Say hello</button>

      {!hasPermission && <Intro onAccept={requestPermission} />}
    </div>
  );
}

export default App;
