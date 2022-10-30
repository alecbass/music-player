import {
  createContext,
  useCallback,
  useState,
  useRef,
  PropsWithChildren,
} from "react";

class AudioPlayer {
  audioContext = new AudioContext();
  oscillator: OscillatorNode = null!;
  isPlaying = false;

  constructor() {
    this.initAudio();
  }

  async initAudio() {
    await window.navigator.requestMIDIAccess();
    this.oscillator = this.audioContext.createOscillator();
  }

  stopOscillator() {
    this.oscillator.stop();
    this.oscillator.disconnect();
  }

  playSound(frequency: number, multiply?: boolean) {
    console.debug("AudioPlayer::playSound");

    if (this.isPlaying) {
      this.stopOscillator();
    }

    this.isPlaying = true;

    this.oscillator = this.audioContext.createOscillator();
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
  start: () => void;
  stop: () => void;
  playNote: (key: number) => void;
}

function createState(): AudioState {
  return {
    isPlaying: true,
    start: () => {
      /** Filled in by provider */
    },
    stop: () => {
      /** Filled in by provider */
    },
    playNote: () => {
      /** Filled in by provider */
    },
  };
}

export const Audio = createContext<AudioState>(createState());

export function AudioContextProvider({ children }: PropsWithChildren<{}>) {
  const audioPlayer = useRef(new AudioPlayer());
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <Audio.Provider value={{ isPlaying, start, stop, playNote }}>
      {children}
    </Audio.Provider>
  );
}
