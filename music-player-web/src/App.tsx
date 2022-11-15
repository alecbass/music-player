import React, { useCallback, useRef, useState } from "react";

import type { Note, NoteWithMidi } from "interface/Note";
import { useAudio, useSong, useWasm, useKeyboard } from "hooks";
import { Selector, SongViewer, Intro, Button, Footer } from "components";
import {
  eightMelodiesMapped,
  noteToMidi,
  mario,
  zelda,
  harmonyMapped,
} from "components/const";
import {
  bytesToMidiFile,
  downloadFile,
  generateRandomMidi,
  exportNotes,
  importNotes,
} from "utils";
import { MusicPlayer } from "player";

import "./App.scss";

const DEFAULT_TEMPO = 144;
const player = new MusicPlayer();

function App() {
  // Null if check has not been finalised, otherwise true
  const { hasPermission, requestPermission } = useAudio();
  const { notes, setNotes } = useSong();
  const wasm = useWasm();
  const tempoInputRef = useRef<HTMLInputElement | null>(null);
  const [midiFile, setMidiFile] = useState<File | null>(null);
  const [draggingNewNote, setDraggingNewNote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyboardNotePressed = useCallback(
    (note: string) => {
      const bytes = wasm.on_note(
        1,
        { key: noteToMidi[note as keyof typeof noteToMidi], length: 9999 },
        tempoInputRef.current?.valueAsNumber ?? DEFAULT_TEMPO
      );
      const file = bytesToMidiFile(bytes);

      player.stop();
      player.setSource(file);
      player.play();
    },
    [wasm]
  );

  const handleKeyboardNoteAdd = useCallback(
    (note: Omit<Note, "id">) => {
      player.stop();
      setNotes((notes) => [...notes, { ...note, id: notes.length }]);
    },
    [setNotes]
  );

  useKeyboard({
    onKeyDown: handleKeyboardNotePressed,
    onKeyUp: handleKeyboardNoteAdd,
  });

  function handleAddManualNote(note: string) {
    setNotes((notes) => [
      ...notes,
      { id: notes.length, key: note, length: 1000 },
    ]);
  }

  function handleManualNoteDrop(afterIndex: number) {
    if (!draggingNewNote) {
      return;
    }

    // Create a new note
    const note: Note = {
      id: notes.length,
      key: draggingNewNote,
      length: 200,
    };

    if (afterIndex === -1) {
      setNotes((notes) => [note, ...notes]);
      return;
    }

    setNotes((notes) => [
      ...notes.slice(0, afterIndex),
      note,
      ...notes.slice(afterIndex),
    ]);
  }

  async function doWasmStuff() {
    setIsLoading(true);
    const toCombine = notes.map((n) => ({
      key: noteToMidi[n.key as keyof typeof noteToMidi],
      length: Math.floor(n.length),
    })) as NoteWithMidi[];

    const midiFileBytes = wasm.combine_all_notes(
      1,
      toCombine,
      tempoInputRef.current?.valueAsNumber ?? DEFAULT_TEMPO
    );

    const midiFile = bytesToMidiFile(midiFileBytes);
    setMidiFile(midiFile);
    setIsLoading(false);

    player.stop();
    player.setSource(midiFile);
    player.play();
  }

  async function loadDataUri(dataUri: string) {
    player.stop();
    player.setSource(dataUri);
    player.play();
  }

  function handleGenerateRandomMidi() {
    setIsLoading(true);
    let benchMark = performance.now();
    let notes = wasm.generate_random_midi(300) as Note[];
    let diff = performance.now() - benchMark;
    console.debug(`WASM took ${diff}ms`);
    console.debug(notes);

    benchMark = performance.now();
    notes = generateRandomMidi(999990);
    diff = performance.now() - benchMark;
    console.debug(`JS took ${diff}ms`);
    console.debug(notes);
    setNotes(notes);

    setIsLoading(false);
  }

  function handleDownloadFile() {
    if (midiFile) {
      downloadFile(midiFile);
    }
  }

  async function handleLoadFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const [file] = e.target.files;
      const notes = await importNotes(wasm, file);
      setNotes(notes);
    }
  }

  function handleExportFile() {
    exportNotes(notes);
  }

  return (
    <div id="main">
      <h1 style={{ alignSelf: "center" }}>WASM-React Music Player</h1>
      <div style={{ display: "flex", flexDirection: "row", height: 800 }}>
        <Selector
          onNewNoteDrag={setDraggingNewNote}
          onNoteSelected={handleAddManualNote}
        />
        <SongViewer
          draggingNewNote={draggingNewNote}
          notes={notes}
          onNewNoteDropped={handleManualNoteDrop}
          onNotesChanged={setNotes}
        />
      </div>

      <section className="extras">
        <h3>Extras</h3>
        <div className="extras-blocks">
          <div className="extras-block">
            <h3>Library</h3>
            <Button disabled={isLoading} onClick={handleGenerateRandomMidi}>
              Random Song
            </Button>
            <Button onClick={() => setNotes(eightMelodiesMapped)}>
              Eight Melodies (Earthbound Beginnings)
            </Button>
            <Button onClick={() => setNotes(harmonyMapped)}>
              Harmony (Runescape)
            </Button>
            <Button>
              <label
                htmlFor="file-upload"
                style={{ height: "100%", width: "100%`" }}
              >
                Load your own!
                <input
                  type="file"
                  id="file-upload"
                  accept=".json"
                  disabled={isLoading}
                  // style={{ visibility: "hidden"}}
                  style={{ display: "none" }}
                  onChange={handleLoadFile}
                />
              </label>
            </Button>
            <Button disabled={!notes.length} onClick={handleExportFile}>
              Export your song
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <b>Coming soon...</b>
              <span>Harmony - Runescape</span>
              <span>Feel free to tell me some ideas lol</span>
            </div>
          </div>

          <div className="extras-block">
            <h3>Options</h3>
            <Button disabled={isLoading || !notes.length} onClick={doWasmStuff}>
              Generate and play MIDI
            </Button>
            <Button
              disabled={isLoading || !midiFile}
              onClick={handleDownloadFile}
            >
              Download your MIDI file
            </Button>
            <div style={{ display: "flex" }}>
              <label title="The tempo at which the generated file will play">
                Tempo:
              </label>
              <input
                ref={tempoInputRef}
                type="number"
                defaultValue={DEFAULT_TEMPO}
              />
            </div>
          </div>

          <div className="extras-block">
            <h3>Misc</h3>
            <Button onClick={() => loadDataUri(mario)}>Play Mario</Button>
            <Button onClick={() => loadDataUri(zelda)}>Play Zelda!!!</Button>
            <b>
              These aren't related to WASM functionality, rather cool things I
              found while researching MIDI files
            </b>
          </div>
        </div>
        <Footer />
      </section>

      {!hasPermission && <Intro onAccept={requestPermission} />}
    </div>
  );
}

export default App;
