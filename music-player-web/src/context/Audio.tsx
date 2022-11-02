import {
  createContext,
  useCallback,
  useState,
  useRef,
  PropsWithChildren,
  useEffect,
} from "react";

import type { Note } from "interface/Note";
import { noteToMidi } from "components/const";

/**
 * Turns a MIDI key to its result frequency
 * Formula: f = 2**((m - 69) / 12) * 440Hz where m is the given key
 *
 * @returns The result of the foruma above
 */
function keyToFrequency(key: number) {
  return 2 ** ((key - 69) / 12) * 440;
}

class AudioPlayer {
  audioContext: AudioContext = null!;
  oscillator: OscillatorNode = null!;
  isPlaying = false;

  constructor() {
    this.initAudio();
  }

  async initAudio() {
    this.audioContext = new AudioContext();
    this.oscillator = this.audioContext.createOscillator();
  }

  stopOscillator() {
    this.oscillator.stop();
    this.oscillator.disconnect();
  }

  /**
   * Plays a given MIDI key
   *
   * @param key MIDI key to play as a requency
   * @param multiply Test - should play multiple streams at once
   */
  playSound(key: number, multiply?: boolean) {
    console.debug("AudioPlayer::playSound");

    if (this.isPlaying) {
      this.stopOscillator();
    }

    this.isPlaying = true;

    const frequency = keyToFrequency(key);

    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.type = "triangle";
    this.oscillator.frequency.setTargetAtTime(
      frequency,
      this.audioContext.currentTime,
      0
    );
    this.oscillator.connect(this.audioContext.destination);
    this.oscillator.start(0);

    if (multiply) {
      for (let i = 2; i < 5; i++) {
        const another = this.audioContext.createOscillator();
        another.frequency.setTargetAtTime(
          frequency / i,
          this.audioContext.currentTime,
          0
        );
        another.connect(this.audioContext.destination);
        another.start(0);

        setTimeout(() => {
          another.stop();
          another.disconnect();
        }, i * 1000);
      }
    }
  }

  /** Plays an entire song */
  playSong(notes: Note[]) {
    console.debug("AudioPlayer::playSong", notes);

    if (this.isPlaying) {
      this.stopOscillator();
    }

    this.isPlaying = true;

    const length = 10;
    const eps = 0.01;
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.type = "sine";
    this.oscillator.connect(this.audioContext.destination);
    this.oscillator.start(0);

    let time = this.audioContext.currentTime + eps;
    for (const note of notes) {
      const frequency = keyToFrequency(
        noteToMidi[note.key as keyof typeof noteToMidi]
      );
      this.oscillator.frequency.setTargetAtTime(0, time - eps, 0.001);
      this.oscillator.frequency.setTargetAtTime(frequency, time, 0.001);
      // time += length / (note.length / 100);
      time += note.length / 300;
      console.debug(time);
    }
  }

  start() {
    console.debug("AudioPlayer::start");
    this.playSound(800, true);
  }

  stop() {
    console.debug("AudioPlayer::stop");
    this.stopOscillator();
    this.isPlaying = false;
  }
}

export interface AudioState {
  isPlaying: boolean;
  /** If MIDI audio is allowed to be played */
  hasPermission: boolean | null;
  start: () => void;
  stop: () => void;
  playNote: (key: number) => void;
  playSong: (notes: Note[]) => void;
  requestPermission: () => void;
}

function createState(): AudioState {
  return {
    isPlaying: true,
    hasPermission: false,
    start: () => {
      /** Filled in by provider */
    },
    stop: () => {
      /** Filled in by provider */
    },
    playNote: () => {
      /** Filled in by provider */
    },
    playSong: () => {
      /** Filled in by provider */
    },
    requestPermission: () => {
      /** Filled in by provider */
    },
  };
}

export const Audio = createContext<AudioState>(createState());

export function AudioContextProvider({ children }: PropsWithChildren<{}>) {
  const audioPlayer = useRef<AudioPlayer>(null!);
  const [isPlaying, setIsPlaying] = useState(false);
  // Null to begin with, true if has permission and false otherwise
  const [hasPermission, setHasMIDIPermission] = useState<boolean | null>(null);

  const checkMidiAccess = useCallback(async () => {
    const access = await navigator.permissions.query({
      name: "midi" as PermissionName,
    });
    setHasMIDIPermission(access.state === "granted");
    if (access.state === "granted") {
      audioPlayer.current = new AudioPlayer();
    }
  }, []);

  useEffect(() => {
    // Check initial permissions
    checkMidiAccess();
  }, [checkMidiAccess]);

  const start = useCallback(() => {
    setIsPlaying(true);
    audioPlayer.current.start();
  }, []);

  const stop = useCallback(() => {
    setIsPlaying(false);
    audioPlayer.current.stop();
  }, []);

  const playNote = useCallback((key: number) => {
    audioPlayer.current.playSound(key);
  }, []);

  const playSong = useCallback((notes: Note[]) => {
    audioPlayer.current.playSong(notes);
  }, []);

  const requestPermission = useCallback(async () => {
    navigator.requestMIDIAccess().then(checkMidiAccess);
  }, [checkMidiAccess]);

  return (
    <Audio.Provider
      value={{
        isPlaying,
        hasPermission,
        start,
        stop,
        playNote,
        playSong,
        requestPermission,
      }}
    >
      {children}
    </Audio.Provider>
  );
}
