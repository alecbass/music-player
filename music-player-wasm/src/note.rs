use phf::{phf_map, Map};
use serde::{Deserialize, Serialize};

pub static NOTE_TO_MIDI: Map<&'static str, u8> = phf_map! {
  "C3" => 48,
  "C3S" => 49,
  "D3" => 50,
  "D3S" => 51,
  "E3" => 52,
  "F3" => 53,
  "F3S" => 54,
  "G3" => 55,
  "G3S" => 56,
  "A3" => 57,
  "A3S" => 58,
  "B3" => 59,
  "C4" => 60,
  "C4S" => 61,
  "D4" => 62,
  "D4S" => 63,
  "E4" => 64,
  "F4" => 65,
  "F4S" => 66,
  "G4" => 67,
  "G4S" => 68,
  "A4" => 69,
  "B4" => 71,
  "C5" => 72,
  "C5S" => 73,
  "D5" => 74,
  "D5S" => 75,
  "E5" => 76,
  "F5" => 77,
  "F5S" => 78,
  "G5" => 79,
  "G5S" => 80,
  "A5" => 81,
  "A5S" => 82,
  "B5" => 83,
  "C6" => 84,
  "C6S" => 85,
  "D6" => 86,
  "D6S" => 87,
  "E6" => 88,
  "F6" => 89,
  "F6S" => 90,
  "G6" => 91,
  "G6S" => 92,
  "A6" => 93,
  "B6" => 94,
  "B6S" => 95,
};

#[derive(Serialize, Deserialize, Debug)]
pub struct Note {
    pub id: u32,
    pub key: String,
    pub length: u32,
}

impl Note {
    pub fn from_json_bytes(bytes: &[u8]) -> std::io::Result<Vec<Self>> {
        let value: Vec<Note> = serde_json::from_slice(bytes)?;
        Ok(value)
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct NoteWithMidi {
    pub key: u8,
    pub length: u32,
}

impl From<(u8, u32)> for NoteWithMidi {
    fn from((key, length): (u8, u32)) -> Self {
        Self { key, length }
    }
}

impl From<&Note> for NoteWithMidi {
    fn from(note: &Note) -> Self {
        // If the note string is not valid, then fail
        let key = NOTE_TO_MIDI.get(&note.key).unwrap();
        Self {
            key: *key,
            length: note.length,
        }
    }
}
