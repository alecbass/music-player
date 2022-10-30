// https://orangelearnof.files.wordpress.com/2013/03/screen-shot-2013-03-07-at-6-21-53-pm.png
// https://i.pinimg.com/originals/25/d3/d3/25d3d3a21e46a8144ad79d6cf29729df.png

import type { Note } from "interface/Note";

export const noteToMidi = {
  C3: 48,
  C3S: 49,
  D3: 50,
  D3S: 51,
  E3: 52,
  F3: 53,
  F3S: 54,
  G3: 55,
  G3S: 56,
  A3: 57,
  A3S: 58,
  B3: 59,
  C4: 60,
  C4S: 61,
  D4: 62,
  D4S: 63,
  E4: 64,
  F4: 65,
  F4S: 66,
  G4: 67,
  G4S: 68,
  A4: 69,
  B4: 71,
  C5: 72,
  C5S: 73,
  D5: 74,
  D5S: 75,
  E5: 76,
  F5: 77,
  F5S: 78,
  G5: 79,
  G5S: 80,
  A5: 81,
  A5S: 82,
  B5: 83,
  C6: 84,
  C6S: 85,
  D6: 86,
  D6S: 87,
  E6: 88,
  F6: 89,
  F6S: 90,
  G6: 91,
  G6S: 92,
  A6: 93,
  B6: 94,
  B6S: 95,
};

export const keyNoteMapping: { [key: string]: keyof typeof noteToMidi } = {
  a: "A4",
  s: "B4",
  d: "C5",
  f: "D5",
  g: "E5",
  h: "F5",
  j: "G5",
  k: "A5",
  l: "B5",
  q: "C6",
  w: "D6",
  r: "E6",
  t: "F6",
  y: "G6",
  u: "A6",
  i: "B6",
};

type NoteTuple = [keyof typeof noteToMidi, number];

/**
 * Eight melodies from Mother :)
 * I think the notes are off by one lol
 */
const EIGHT_MELODIES: NoteTuple[] = [
  ["C5", 1],
  ["D5", 1],
  ["E5", 1],
  ["G5", 1],
  ["D5", 4],
  ["C6", 1],
  ["B5", 1],
  ["A5", 1],
  ["E5", 1],
  ["G5", 4],
  ["A5", 1],
  ["B5", 1],
  ["C6", 1],
  ["G5", 2],
  ["C5", 3.5],
  ["F5", 1],
  ["E5", 1],
  ["C5", 1],
  ["G4", 5],
  ["A4", 2],
  ["B4", 2],
  ["C5", 2],
  ["F5", 2],
  ["E5", 1],
  ["F5", 1],
  ["G5", 1],
  ["E5", 1],
  ["D5", 1],
  ["E5", 1],
  ["F5", 1],
  ["D5", 1],
  ["A4", 1],
  ["F5", 1],
  ["E5", 1],
  ["G4", 1],
  ["D5", 2],
  ["B4", 2],
  ["C5", 2],
  ["G4", 1],
  ["D5", 1],
  ["C5", 4],
];

function rawToNotes(raw: NoteTuple[]): Note[] {
  return raw.map((rawNote) => ({ key: rawNote[0], length: rawNote[1] * 100 }));
}

export const eightMelodiesMapped = rawToNotes(EIGHT_MELODIES);
