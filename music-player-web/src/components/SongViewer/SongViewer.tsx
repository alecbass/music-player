import type { Note } from "interface/Note";
import { NoteBlock } from "./NoteBlock";

interface Props {
  notes: Note[];
}

export function SongViewer(props: Props) {
  function renderNote(note: Note, index: number) {
    return (
      <NoteBlock
        key={index}
        note={note.key}
        width={`${(note.length * 2) / 100}rem`}
      />
    );
  }

  return <div className="song-viewer">{props.notes.map(renderNote)}</div>;
}
