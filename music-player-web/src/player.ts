import MidiPlayer from "midi-player-js";
import Soundfont from "soundfont-player";

type Source = File | string;

export class MusicPlayer {
  player: MidiPlayer.Player | null = null;
  private audioContext = new AudioContext();
  private instrumentCache: Partial<
    Record<Soundfont.InstrumentName, Soundfont.Player>
  > = {};

  constructor(
    private source?: Source,
    private instrument: Soundfont.InstrumentName = "kalimba"
  ) {
    Soundfont.instrument(this.audioContext, instrument).then((i) => {
      this.instrumentCache[instrument] = i;
    });
  }

  /** Reads a file and plays its MIDI contents */
  private playFile(
    file: File,
    audioContext: AudioContext,
    instrument: Soundfont.Player
  ) {
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      // Play music when the file has finished loading
      this.player = new MidiPlayer.Player((event: MidiPlayer.Event) => {
        if (event.name === "Note on") {
          instrument.play(event.noteName!, audioContext.currentTime, {
            gain: event.velocity! / 100,
          });
        }
      });

      const result = e.target?.result;
      if (!result) {
        // No result, don't play the music :(
        return;
      }

      // Load and hopefully play!
      this.player.loadArrayBuffer(result as ArrayBuffer);
      this.player.play();
    });

    reader.readAsArrayBuffer(file);
  }

  /** Plays music from a big data string */
  private playDataUri(
    uri: string,
    audioContext: AudioContext,
    instrument: Soundfont.Player
  ) {
    this.player = new MidiPlayer.Player((event: MidiPlayer.Event) => {
      if (event.name === "Note on" && event.velocity! > 0) {
        instrument.play(event.noteName!, audioContext.currentTime, {
          gain: event.velocity! / 100,
        });
      }
    });

    this.player.loadDataUri(uri);
    this.player.play();
  }

  async play() {
    if (!this.source) {
      throw new Error("Trying to play without a source.");
    }

    let instrument: Soundfont.Player;

    if (!(this.instrument in this.instrumentCache)) {
      instrument = await Soundfont.instrument(
        this.audioContext,
        this.instrument
      );
      this.instrumentCache[this.instrument] = instrument;
    } else {
      instrument = this.instrumentCache[this.instrument]!;
    }

    if (this.source instanceof File) {
      this.playFile(this.source, this.audioContext, instrument);
    } else {
      this.playDataUri(this.source, this.audioContext, instrument);
    }
  }

  async stop() {
    this.player?.stop();
    this.player = null;
  }

  public setSource(source: Source) {
    this.source = source;
  }
}
