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

const HARMONY: NoteTuple[] = [
  // First bit
  ["A5", 1],
  ["B5", 1],
  ["C6", 1],
  ["A5", 1],
  ["B5", 1],
  ["C6", 1],
  ["E6", 1],
  ["D6", 1],
  ["G5", 3],
  ["D6", 1],
  ["C6", 1],
  ["B5", 2],
  ["C6", 1],
  ["B5", 1],
  ["A5", 2],
  ["G5", 3],
  ["A5", 1],
  ["B5", 1],
  ["C6", 1],
  ["A5", 1],
  ["B5", 1],
  ["C6", 1],
  ["E6", 1],
  ["D6", 1],
  ["G5", 3],
  ["D6", 1],
  ["C6", 1],
  ["B5", 2],
  ["G5", 2],
  ["A5", 1],

  // Second bit
  ["A5", 2],
  ["A5", 1],
  ["A5", 2],
  ["A5", 2],
  ["G5", 2],
  ["E5", 1],
  ["D5", 2],
  ["C5", 2],
  ["D5", 2],
  ["E5", 2],
  ["D5", 2],
  ["C5", 2],
  ["B4", 2],
  ["A5", 2],
  ["A5", 1],
  ["A5", 2],
  ["A5", 2],
  ["E5", 2],
  ["G5", 1],
  ["F5", 1],
  ["E5", 2],
  ["C5", 2],
  ["A4", 2],

  // Third bit
  ["A5", 1],
  ["A5", 1],
  ["E5", 1],
  ["E5", 1],
  ["C5S", 1],
  ["C5S", 1],
  ["A5", 1],
  ["A5", 1],
  ["E5", 1],
  ["E5", 1],
  ["C5S", 1],
  ["C5S", 1],
  ["E5", 1],
  ["E5", 1],
  ["B4", 1],
  ["B4", 1],
  ["G4", 1],
  ["G4", 1],
  ["E5", 1],
  ["E5", 1],
  ["B4", 1],
  ["B4", 1],
  ["G4", 1],
  ["G4", 1],
  ["A5", 1],
  ["A5", 1],
  ["E5", 1],
  ["E5", 1],
  ["C5S", 1],
  ["C5S", 1],
  ["A5", 1],
  ["A5", 1],
  ["E5", 1],
  ["E5", 1],
  ["C5S", 1],
  ["C5S", 1],
  ["E5", 1],
  ["E5", 1],
  ["B4", 1],
  ["B4", 1],
  ["G4", 1],
  ["G4", 1],
  ["E5", 1],
  ["E5", 1],
  ["B4", 1],
  ["B4", 1],
  ["G4", 1],
  ["G4", 1],

  // Fourth bit
  ["A5", 2],
  ["A5", 1],
  ["A5", 2],
  ["A5", 2],
  ["G5", 2],
  ["E5", 1],
  ["D5", 2],
  ["C5", 2],
  ["D5", 2],
  ["E5", 2],
  ["D5", 2],
  ["C5", 2],
  ["B4", 2],
  ["A5", 2],
  ["A5", 1],
  ["A5", 2],
  ["A5", 2],
  ["E5", 2],
  ["G5", 1],
  ["F5", 1],
  ["E5", 2],
  ["C5", 2],
  ["A4", 2],

  // Fifth bit
  ["A5", 1],
  ["A5", 1],
  ["E5", 1],
  ["E5", 1],
  ["C5S", 1],
  ["C5S", 1],
  ["A5", 1],
  ["A5", 1],
  ["E5", 1],
  ["E5", 1],
  ["C5S", 1],
  ["C5S", 1],
  ["E5", 1],
  ["E5", 1],
  ["B4", 1],
  ["B4", 1],
  ["G4", 1],
  ["G4", 1],
  ["E5", 1],
  ["E5", 1],
  ["B4", 1],
  ["B4", 1],
  ["G4", 1],
  ["G4", 1],
  ["A5", 1],
  ["A5", 1],
  ["E5", 1],
  ["E5", 1],
  ["C5S", 1],
  ["C5S", 1],
  ["A5", 1],
  ["A5", 1],
  ["E5", 1],
  ["E5", 1],
  ["C5S", 1],
  ["C5S", 1],
  ["E5", 1],
  ["E5", 1],
  ["B4", 1],
  ["B4", 1],
  ["G4", 1],
  ["G4", 1],
  ["E5", 1],
  ["E5", 1],
  ["B4", 1],
  ["B4", 1],
  ["G4", 1],
  ["G4", 1],
];

function rawToNotes(raw: NoteTuple[]): Note[] {
  return raw.map((rawNote, index) => ({
    id: index,
    key: rawNote[0],
    length: rawNote[1] * 100,
  }));
}

export const eightMelodiesMapped = rawToNotes(EIGHT_MELODIES);

export const harmonyMapped = rawToNotes(HARMONY);

export const zelda =
  "data:audio/midi;base64,TVRoZAAAAAYAAQACAIBNVHJrAAADoQDAAQCQRn+CAIBGfwCQRn9AgEZ/AJBBf0CAQX8AkEF/QIBBfwCQRn9AgEZ/AJBEfyCARH8AkEJ/IIBCfwCQRH+DAIBEf0CQRn+CAIBGfwCQRn9AgEZ/AJBBf0CAQX8AkEF/QIBBfwCQRn9AgEZ/AJBFfyCARX8AkEN/IIBDfwCQRX+BQIBFf4IAkEUBhACARQGEAJBGf4EAgEZ/AJBBf4FAgEF/AJBGf0CARn8AkEZ/IIBGfwCQSH8ggEh/AJBKfyCASn8AkEt/IIBLfwCQTX+CAIBNf0CQTX9AgE1/AJBNf0CATX8AkE5/IIBOfwCQUH8ggFB/AJBSf4IAgFJ/QJBSf0CAUn8AkFJ/QIBSfwCQUH8ggFB/AJBOfyCATn8AkFB/YIBQfwCQTn8ggE5/AJBNf4IAgE1/AJBNf4EAgE1/AJBLf2CAS38AkE1/IIBNfwCQTn+CAIBOfwCQTX9AgE1/AJBLf0CAS38AkEl/YIBJfwCQS38ggEt/AJBNf4IAgE1/AJBLf0CAS38AkEl/QIBJfwCQSH9ggEh/AJBKfyCASn8AkEx/ggCATH8AkE9/gQCAT38AkE1/QIBNfwCQQX8ggEF/AJBBfyCAQX8AkEF/QIBBfwCQQX8ggEF/AJBBfyCAQX8AkEF/QIBBfwCQQX8ggEF/AJBBfyCAQX8AkEF/QIBBfwCQQX9AgEF/AJBGf4EAgEZ/AJBBf4FAgEF/AJBGf0CARn8AkEZ/IIBGfwCQSH8ggEh/AJBKfyCASn8AkEt/IIBLfwCQTX+CAIBNf0CQTX9AgE1/AJBNf0CATX8AkE5/IIBOfwCQUH8ggFB/AJBSf4MAgFJ/AJBVf4EAgFV/AJBUf4EAgFR/AJBRf4IAgFF/AJBNf4EAgE1/AJBOf4MAgE5/AJBSf4EAgFJ/AJBRf4EAgFF/AJBNf4IAgE1/AJBNf4EAgE1/AJBOf4MAgE5/AJBSf4EAgFJ/AJBRf4EAgFF/AJBNf4IAgE1/AJBKf4EAgEp/AJBLf4MAgEt/AJBOf4EAgE5/AJBNf4EAgE1/AJBJf4IAgEl/AJBGf4EAgEZ/AJBIf2CASH8AkEp/IIBKfwCQTH+CAIBMfwCQT3+BAIBPfwCQTX9AgE1/AJBBfyCAQX8AkEF/IIBBfwCQQX9AgEF/AJBBfyCAQX8AkEF/IIBBfwCQQX9AgEF/AJBBfyCAQX8AkEF/IIBBfwCQQX9AgEF/AJBBf0CAQX8A/y8ATVRyawAACUMAwAEAkCpAgQCAKkAAkDVAgQCANUAAkDpAggCAOkAAkClAgQCAKUAAkDNAgQCAM0AAkDhAggCAOEAAkCdAgQCAJ0AAkDFAgQCAMUAAkDpAggCAOkAAkCpAgQCAKkAAkDVAgQCANUAAkDpAggCAOkAAkC5AQIAuQACQLkAggC5AAJApQCCAKUAAkC5AQIAuQACQLkAggC5AAJApQCCAKUAAkC5AQIAuQACQLkAggC5AAJApQCCAKUAAkC5AIIAuQACQKUAggClAAJAuQCCALkAAkClAIIApQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkAggC5AAJApQCCAKUAAkC5AIIAuQACQKUAggClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQCCALkAAkClAIIApQACQLkAggC5AAJApQCCAKUAAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAIIAsQACQJ0AggCdAAJAsQCCALEAAkCdAIIAnQACQKkBAgCpAAJAqQCCAKkAAkCVAIIAlQACQKkBAgCpAAJAqQCCAKkAAkCVAIIAlQACQKkBAgCpAAJAqQCCAKkAAkCVAIIAlQACQKkAggCpAAJAlQCCAJUAAkCpAIIAqQACQJUAggCVAAJAxQECAMUAAkDFAIIAxQACQLEAggCxAAJAxQECAMUAAkDFAIIAxQACQLEAggCxAAJAxQECAMUAAkDFAIIAxQACQLEAggCxAAJAxQCCAMUAAkCxAIIAsQACQMUAggDFAAJAsQCCALEAAkC9AQIAvQACQL0AggC9AAJAqQCCAKkAAkC9AQIAvQACQL0AggC9AAJAqQCCAKkAAkC9AQIAvQACQL0AggC9AAJAqQCCAKkAAkC9AIIAvQACQKkAggCpAAJAvQCCAL0AAkCpAIIAqQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkAggC5AAJApQCCAKUAAkC5AIIAuQACQKUAggClAAJAwQECAMEAAkDBAIIAwQACQK0AggCtAAJAwQECAMEAAkDBAIIAwQACQK0AggCtAAJAwQECAMEAAkDBAIIAwQACQK0AggCtAAJAwQCCAMEAAkCtAIIArQACQMEAggDBAAJArQCCAK0AAkClAQIApQACQOUAggDlAAJA5QCCAOUAAkDhAQIA4QACQOEAggDhAAJA4QCCAOEAAkDdAQIA3QACQN0AggDdAAJA3QCCAN0AAkDZAQIA2QACQKUBAgClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQCCALkAAkClAIIApQACQLkAggC5AAJApQCCAKUAAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAIIAsQACQJ0AggCdAAJAsQCCALEAAkCdAIIAnQACQKkBAgCpAAJAqQCCAKkAAkCpAIIAqQACQKkBAgCpAAJAqQCCAKkAAkCpAIIAqQACQKkBAgCpAAJAqQCCAKkAAkCpAIIAqQACQKkAggCpAAJAqQCCAKkAAkCpAIIAqQACQKkAggCpAAJApQECAKUAAkClAIIApQACQKUAggClAAJApQECAKUAAkClAIIApQACQKUAggClAAJApQECAKUAAkClAIIApQACQKUAggClAAJApQCCAKUAAkClAIIApQACQKUAggClAAJApQCCAKUAAkChAQIAoQACQKEAggChAAJAoQCCAKEAAkChAQIAoQACQKEAggChAAJAoQCCAKEAAkChAQIAoQACQKEAggChAAJAoQCCAKEAAkChAIIAoQACQKEAggChAAJAoQCCAKEAAkChAIIAoQACQKUBAgClAAJApQCCAKUAAkClAIIApQACQKUBAgClAAJApQCCAKUAAkClAIIApQACQKUBAgClAAJApQCCAKUAAkClAIIApQACQKUAggClAAJApQCCAKUAAkClAIIApQACQKUAggClAAJAoQECAKEAAkChAIIAoQACQKEAggChAAJAoQECAKEAAkChAIIAoQACQKEAggChAAJAoQECAKEAAkChAIIAoQACQKEAggChAAJAoQCCAKEAAkChAIIAoQACQKEAggChAAJAoQCCAKEAAkClAQIApQACQKUAggClAAJApQCCAKUAAkClAQIApQACQKUAggClAAJApQCCAKUAAkClAQIApQACQKUAggClAAJApQCCAKUAAkClAIIApQACQKUAggClAAJApQCCAKUAAkClAIIApQACQL0BAgC9AAJAvQCCAL0AAkC9AIIAvQACQL0BAgC9AAJAvQCCAL0AAkC9AIIAvQACQL0BAgC9AAJAvQCCAL0AAkC9AIIAvQACQL0AggC9AAJAvQCCAL0AAkC9AIIAvQACQL0AggC9AAJAuQECALkAAkC5AIIAuQACQLkAggC5AAJAuQECALkAAkC5AIIAuQACQLkAggC5AAJAuQECALkAAkC5AIIAuQACQLkAggC5AAJAuQCCALkAAkC5AIIAuQACQLkAggC5AAJAuQCCALkAAkDBAQIAwQACQMEAggDBAAJAwQCCAMEAAkDBAQIAwQACQMEAggDBAAJAwQCCAMEAAkDBAQIAwQACQMEAggDBAAJAwQCCAMEAAkDBAIIAwQACQMEAggDBAAJAwQCCAMEAAkDBAIIAwQACQKUBAgClAAJA5QCCAOUAAkDlAIIA5QACQOEBAgDhAAJA4QCCAOEAAkDhAIIA4QACQN0BAgDdAAJA3QCCAN0AAkDdAIIA3QACQNkBAgDZAAJApQECAKUAA/y8A";

export const mario =
  "data:audio/midi;base64,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QgAAOQAPOWQAQmQtQgAAOQBLJmQtJgAPOWQAQmQtQgAAOQAPOWQAQmQtQgAAOQBLK2QtKwAPQ2QAO2QtOwAAQwAPQ2QAO2QtOwAAQwBLT1AAK2QtKwAPQ2QAO2QtOwAAQwAPO2QAQ2QtQwAAOwBLTwAATVAAL2QtLwAPQWQAR2QtRwAAQQAPQWQAR2QtRwAAQQBLTQAATFAAMGQtMAAPQGQASGQtSAAAQAAPQGQASGQtSAAAQABLTAAAMWQAS1AtMQAPP2QASWQtSQAAPwAPP2QASWQtSQAAPwBLSwAAMmQASlAtMgAPQmQARWQtRQAAQgAPQmQARWQtRQAAQgBLSgAAKmQASFAtKgAPPmQAQmQtQgAAPgAPPmQAQmQtQgAAPgBLSAAAL2QAN2QAR1AtNwAALwBLK2QAL2QtLwAAKwBLRwAAL2QAN2QtNwAALwBLSmRaSgAASGQeSAAAN2QAK2QAR2Q8NwAAO2Q8OwAARwAAPmQASmQ8PgAAO2Q8OwAASgAAKwAAN2QAL2QAT2Q8NwAAO2Q8OwAAPmQ8PgAATwAATmQAO2Q8OwAATgAALwAAPGQAMGQAS2Q8PAAAQGQ8QAAASwAAQ2QATGQ8QwAAQGQ8QAAATAAAMAAAMWQAPWQAUWQ8PQAAQGQ8QAAAQ2Q8QwAAUQAAT2QAQGQ8QAAATwAAMQAAPmQAMmQ8PgAAQmQ8QgAARWQ8RQAAQmQ8QgAAMgAAPmQALWQ8PgAAQmQ8QgAARWQ8RQAAQmQ8QgAALQAAN2QAL2Q8NwAAO2Q8OwAAPmQ8PgAAO2Q8OwAALwAAN2QAK2Q8NwAAO2Q8OwAASmQAPmQ8PgAAO2QeSgAASGQeSAAAOwAAKwAAN2QAK2QAR2Q8NwAAO2Q8OwAARwAAPmQASmQ8PgAAO2Q8OwAASgAAKwAAN2QAL2QAT2Q8NwAAO2Q8OwAAPmQ8PgAATwAATmQAO2Q8OwAATgAALwAAPGQAMGQAS2Q8PAAAQGQ8QAAASwAAQ2QATGQ8QwAAQGQ8QAAATAAAMAAAMWQAPWQAUWQ8PQAAQGQ8QAAAQ2Q8QwAAUQAAQGQAT2Q8TwAAQAAAMQAAPmQAMmQ8PgAAQmQ8QgAARWQ8RQAAQmQ8QgAAMgAAOWQAKmQ8OQAAPmQ8PgAAQmQ8QgAAPmQ8PgAAKgAAO2QAK2Q8OwAAPmQ8PgAAOWQ8OQAAPmQ8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";
