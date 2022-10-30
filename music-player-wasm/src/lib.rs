use wasm_bindgen::prelude::*;

use std::{sync::RwLock, thread::*};

extern crate serde;

pub mod piece;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
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

#[wasm_bindgen]
pub fn thread_stuff() -> i32 {
    let mut value: RwLock<Option<i32>> = RwLock::new(None);
    fn do_thing() {
        alert("HELLO from thread!!!!!!!!!!!!!!!!!!!!!!!!!");
    }
    // spawn(do_thing).join().unwrap();

    alert("Exited thread breeheheee");

    return 5;
}
