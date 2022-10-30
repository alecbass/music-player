import React, { useMemo } from "react";
import type { Note } from "interface/Note";

interface Props {
  note: Note;
}

export function NoteBlock(props: Props) {
  const style = useMemo<React.CSSProperties>(
    () => ({
      width: `${props.note.length * 2}rem`,
    }),
    [props.note]
  );

  return (
    <div className="note" style={style}>
      {props.note.key}
    </div>
  );
}
