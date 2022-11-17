import type { Note } from "interface/Note";
import { noteToMidi } from "components/const";

export function downloadFile(file: File) {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

export function bytesToMidiFile(bytes: Uint8Array) {
  return new File(
    [new Blob([bytes.buffer], { type: "audio/midi" })],
    "test.mid"
  );
}

export function classNames(...names: (string | undefined | boolean)[]) {
  return names.filter((n) => !!n).join(" ");
}

/** Generates an array of random MIDI note objects based */
export function generateRandomMidi(length: number): Note[] {
  const allNotes = Object.keys(noteToMidi);

  function getRandomNote(value: number): Note {
    return {
      id: value,
      key: allNotes[Math.floor(Math.random() * allNotes.length)],
      length: Math.floor(Math.random() * 500),
    };
  }

  return Array.from(Array(length).keys()).map(getRandomNote);
}

export async function importNotes(
  wasm: typeof import("music-player-wasm"),
  file: File
) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  return wasm.get_notes_from_bytes(bytes) as Note[];
}

export function exportNotes(notes: Note[]) {
  const json = JSON.stringify(notes);
  const file = new File([json], "notes.json");
  downloadFile(file);
}
