import React, { createContext, useState, PropsWithChildren } from "react";

import type { Note } from "interface/Note";

export interface SongState {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

function createState(): SongState {
  return {
    notes: [],
    setNotes: () => {
      /** Filled in by provider */
    },
  };
}

export const Song = createContext<SongState>(createState());

export function SongContextProvider({ children }: PropsWithChildren<{}>) {
  const [notes, setNotes] = useState<Note[]>([]);

  return <Song.Provider value={{ notes, setNotes }}>{children}</Song.Provider>;
}
