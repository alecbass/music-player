import { useContext } from "react";
import { Song } from "context/Song";

export function useSong() {
  return useContext(Song);
}
