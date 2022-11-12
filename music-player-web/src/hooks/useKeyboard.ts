import { useEffect, useRef } from "react";
import type { Note } from "interface/Note";

import { keyNoteMapping } from "components/const";
import { useAudio } from "hooks";

interface KeyboardOptions {
  notes: Note[];
  /** Event to fire when a key is pressed */
  onKeyDown: (note: Note["key"]) => void;
  /** Event fired on key up, when a note and its length have been finalised */
  onKeyUp: (note: Note) => void;
  playOnPressed?: boolean;
}

export function useKeyboard(props: KeyboardOptions) {
  const isKeyDown = useRef(false);
  const pressId = useRef(0);
  const { playNote, stop } = useAudio();
  const keyTime = useRef(0);

  const { playOnPressed, notes, onKeyDown, onKeyUp } = props;
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isKeyDown.current) {
        return;
      }

      isKeyDown.current = true;
      keyTime.current = performance.now();
      pressId.current++;

      // Playing a note on key down
      if (e.key in keyNoteMapping) {
        const timePressed = performance.now() - keyTime.current;
        onKeyDown(keyNoteMapping[e.key]);
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      isKeyDown.current = false;
      // const thisPressId = pressId.current;

      if (e.key in keyNoteMapping) {
        const timePressed = performance.now() - keyTime.current;
        onKeyUp({
          id: notes.length,
          key: keyNoteMapping[e.key],
          length: timePressed,
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
  }, [playOnPressed, notes, onKeyDown, onKeyUp, playNote, stop]);
}
