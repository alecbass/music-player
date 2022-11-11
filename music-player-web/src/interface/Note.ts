/** Single note of a piece of music */
export interface Note {
  id: number;
  key: string;
  length: number;
}

/** Note but with the MIDI key stored instead of the key string like "A5" */
export interface NoteWithMidi extends Omit<Note, "id" | "key"> {
  key: number;
}
