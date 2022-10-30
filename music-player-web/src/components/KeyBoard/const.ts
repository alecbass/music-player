// https://orangelearnof.files.wordpress.com/2013/03/screen-shot-2013-03-07-at-6-21-53-pm.png
// https://i.pinimg.com/originals/25/d3/d3/25d3d3a21e46a8144ad79d6cf29729df.png

export const noteToMidi = {
  C3: 48,
  D3: 50,
  E3: 52,
  F3: 53,
  G3: 55,
  A3: 57,
  B3: 59,
  C4: 60 ?? 130.81,
  D4: 62 ?? 293.664,
  E4: 64 ?? 329.63,
  F4: 65 ?? 349.23,
  G4: 67 ?? 391.96,
  A4: 69,
  B4: 71,
  C5: 72,
  D5: 74,
  E5: 76,
  F5: 77,
  G5: 79,
  A5: 81,
  B5: 83,
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
};
