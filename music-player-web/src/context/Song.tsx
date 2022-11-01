import React, {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useCallback,
} from "react";

import type { Note } from "interface/Note";
import { Audio } from "./Audio";

export interface SongState {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  playSong: () => void;
}

function createState(): SongState {
  return {
    notes: [],
    setNotes: () => {
      /** Filled in by provider */
    },
    playSong: () => {
      /** Filled in by procider */
    },
  };
}

export const Song = createContext<SongState>(createState());

export function SongContextProvider({ children }: PropsWithChildren<{}>) {
  const { playSong: playSongAudio } = useContext(Audio);

  const [notes, setNotes] = useState<Note[]>([]);

  const playSong = useCallback(() => {
    playSongAudio(notes);
  }, [playSongAudio, notes]);

  return (
    <Song.Provider value={{ notes, setNotes, playSong }}>
      {children}
    </Song.Provider>
  );
}
