import { useEffect, useState } from "react";
import type { Note } from "interface/Note";

import { NoteBlock } from "./NoteBlock";
import { keyNoteMapping } from "./const";
import { useAudio } from "hooks";

interface Props {
  playOnPressed: boolean;
}

export function KeyBoard(props: Props) {
  const [notes, setNotes] = useState<Note[]>([]);
  const audio = useAudio();

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      const key = keyNoteMapping[e.key as keyof typeof keyNoteMapping];

      if (e.key in keyNoteMapping) {
        setNotes((notes) => [
          ...notes,
          {
            key,
            length: 1,
          },
        ]);

        if (props.playOnPressed) {
          audio.playNote(key);
        }
      }
    }

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [props.playOnPressed]);

  function renderNote(note: Note, index: number) {
    return <NoteBlock key={index} note={note} />;
  }

  return <div className="keyboard">{notes.map(renderNote)}</div>;
}
