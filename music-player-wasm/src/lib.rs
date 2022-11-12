use wasm_bindgen::prelude::*;

use rand::random;

extern crate js_sys;
extern crate midir;
extern crate midly;
extern crate phf;
extern crate rand;
extern crate serde;
extern crate web_sys;

pub mod midi;
pub mod note;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(msg: &str);
    #[wasm_bindgen(js_namespace = console)]
    pub fn debug(msg: &str);
    #[wasm_bindgen(js_namespace = console)]
    pub fn error(msg: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn say_hello() {
    alert("breeheehee");
}

#[wasm_bindgen]
pub fn return_vector() -> Vec<i32> {
    vec![1, 2, 3, 4, 5, 6, 200]
}

use crate::note::{Note, NoteWithMidi, NOTE_TO_MIDI};
use midi::{combine_notes, handle_note};

#[wasm_bindgen]
pub fn combine_all_notes(channel: u8, notes: JsValue, tempo: u16) -> Vec<u8> {
    let notes: Vec<NoteWithMidi> = match serde_wasm_bindgen::from_value(notes) {
        Ok(n) => n,
        Err(e) => {
            log(&format!("Error: {:?}", e));
            return Vec::new();
        }
    };

    combine_notes(channel, notes, tempo, true)
}

#[wasm_bindgen]
pub fn on_note(channel: u8, note: JsValue, tempo: u16) -> Vec<u8> {
    let note: NoteWithMidi = match serde_wasm_bindgen::from_value(note) {
        Ok(n) => n,
        Err(e) => {
            log(&format!("Error: {:?}", e));
            return Vec::new();
        }
    };

    handle_note(channel, note, tempo)
}

/** If true, uses pre-allocation */
const USE_PREALLOCATION: bool = true;

#[wasm_bindgen]
pub fn generate_random_midi(length: usize) -> JsValue {
    let keys: Vec<&&'static str> = NOTE_TO_MIDI.keys().collect();

    fn generate_random_note(value: usize, keys: &Vec<&&'static str>) -> Note {
        let random_index = (random::<f32>() * keys.len() as f32).floor() as usize;
        let key = keys.get(random_index).unwrap();

        Note {
            id: value as u32,
            key: key.to_string(),
            length: (random_index as u32) * 10,
        }
    }

    // We can do an interesting comparison of pre-allocating an array list vs mapping over a range
    let mut notes: Vec<Note>;

    if USE_PREALLOCATION {
        notes = Vec::with_capacity(length);
        for value in 0..length {
            notes.push(generate_random_note(value, &keys));
        }
    } else {
        notes = (0..length)
            .map(|value| generate_random_note(value, &keys))
            .collect::<Vec<Note>>();
    }

    serde_wasm_bindgen::to_value(&notes).unwrap()
}

#[wasm_bindgen]
pub fn get_notes_from_bytes(bytes: Vec<u8>) -> JsValue {
    let notes = match Note::from_json_bytes(&bytes) {
        Ok(notes) => notes,
        Err(e) => {
            error(&format!("Failed to parse notes from JSON bytes: {:?}", e));
            return JsValue::NULL;
        }
    };

    serde_wasm_bindgen::to_value(&notes).unwrap()
}
