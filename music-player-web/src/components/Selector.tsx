import { NoteBlock } from "./SongViewer/NoteBlock";
import { noteToMidi } from "components/const";
import React from "react";

interface Props {
  onNewNoteDrag?: (note: string) => void;
  onNoteSelected: (note: string) => void;
}

export function Selector(props: Props) {
  function renderNote(noteKey: string) {
    function handleClick() {
      props.onNoteSelected(noteKey);
    }

    function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
      e.stopPropagation();
      if (props.onNewNoteDrag) {
        props.onNewNoteDrag(noteKey);
      }
    }

    return (
      <NoteBlock
        key={noteKey}
        note={noteKey}
        onClick={handleClick}
        onDragStart={handleDragStart}
      />
    );
  }

  return (
    <div className="note-selector">
      {Object.keys(noteToMidi).map(renderNote)}
    </div>
  );
}
