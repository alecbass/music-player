import {
  createContext,
  useCallback,
  useState,
  useRef,
  PropsWithChildren,
} from "react";

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
    console.debug(frequency);

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
    } else {
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

// function playTetris() {
//   getOrCreateContext();
//   oscillator.start(0);
//   var time = context.currentTime + eps;
//   tetris.forEach((note) => {
//     const freq = Math.pow(2, (note[0] - 69) / 12) * 440;
//     console.log(time);
//     oscillator.frequency.setTargetAtTime(0, time - eps, 0.001);
//     oscillator.frequency.setTargetAtTime(freq, time, 0.001);
//     time += length / note[1];
//   });
// }
