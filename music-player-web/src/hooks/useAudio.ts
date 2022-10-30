import { useContext } from "react";
import { Audio } from "context/Audio";

export function useAudio() {
  return useContext(Audio);
}
