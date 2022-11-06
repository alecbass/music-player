import { useEffect, useRef } from "react";
import type { Note } from "interface/Note";

import { keyNoteMapping } from "components/const";
import { useAudio } from "hooks";

interface KeyboardOptions {
  notes: Note[];
  onNotePlayed: (note: Note) => void;
  playOnPressed?: boolean;
}

export function useKeyboard(props: KeyboardOptions) {
  const isKeyDown = useRef(false);
  const pressId = useRef(0);
  const { playNote, stop } = useAudio();
  const keyTime = useRef(0);

  const { playOnPressed, notes, onNotePlayed } = props;
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isKeyDown.current) {
        return;
      }

      isKeyDown.current = true;
      keyTime.current = performance.now();
      pressId.current++;

      // if (e.key in keyNoteMapping && playOnPressed) {
      //   playNote(noteToMidi[keyNoteMapping[e.key]]);
      // }
    }

    function handleKeyUp(e: KeyboardEvent) {
      isKeyDown.current = false;
      const thisPressId = pressId.current;
      if (e.key in keyNoteMapping) {
        const timePressed = performance.now() - keyTime.current;
        onNotePlayed({
          key: keyNoteMapping[e.key],
          length: timePressed,
          position: notes.length,
        });

        // setTimeout(() => {
        //   if (thisPressId === pressId.current) {
        //     // The last keyup event was from the same note, stop playing
        //     stop();
        //   }
        // }, 100);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [playOnPressed, notes, onNotePlayed, playNote, stop]);
}
