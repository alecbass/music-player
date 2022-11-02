use wasm_bindgen::prelude::*;

use midir::{Ignore, MidiInput, MidiOutput};
use std::sync::{Arc, Mutex, RwLock};
use web_sys::console;

extern crate js_sys;
extern crate midir;
extern crate serde;
extern crate web_sys;

pub mod note;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(msg: &str);
    #[wasm_bindgen(js_namespace = console)]
    pub fn debug(msg: &str);
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

#[wasm_bindgen]
pub fn start(msg: &str) -> u8 {
    // let token_outer = Arc::new(Mutex::new(None));
    // let token = token_outer.clone();

    my_run().expect("oh no");
    // let closure: Closure<dyn FnMut()> = Closure::wrap(Box::new(move || {
    //     if run().unwrap() == true {
    //         if let Some(token) = *token.lock().unwrap() {
    //             web_sys::window().unwrap().clear_interval_with_handle(token);
    //         }
    //     }
    // }));
    // *token_outer.lock().unwrap() = web_sys::window()
    //     .unwrap()
    //     .set_interval_with_callback_and_timeout_and_arguments_0(
    //         closure.as_ref().unchecked_ref(),
    //         200,
    //     )
    //     .ok();
    // closure.forget();

    5
}

fn my_run() -> Result<bool, ()> {
    debug("RUNNING");
    let window = web_sys::window().expect("no global `window` exists");

    let mut midi_in = MidiInput::new("midir reading input").unwrap();
    midi_in.ignore(Ignore::None);

    // Get an input port
    let ports = midi_in.ports();
    let in_port = match &ports[..] {
        [] => {
            log("No ports available yet, will try again");
            return Ok(false);
        }
        [ref port] => {
            log(&format!(
                "Choosing the only available input port: {}",
                midi_in.port_name(port).unwrap()
            ));
            port
        }
        _ => {
            let mut msg = "Choose an available input port:\n".to_string();
            for (i, port) in ports.iter().enumerate() {
                msg.push_str(format!("{}: {}\n", i, midi_in.port_name(port).unwrap()).as_str());
            }
            loop {
                if let Ok(Some(port_str)) = window.prompt_with_message_and_default(&msg, "0") {
                    if let Ok(port_int) = port_str.parse::<usize>() {
                        if let Some(port) = &ports.get(port_int) {
                            break port.clone();
                        }
                    }
                }
            }
        }
    };

    println!("Opening connection");
    let in_port_name = midi_in.port_name(in_port).unwrap();

    // _conn_in needs to be a named parameter, because it needs to be kept alive until the end of the scope
    let _conn_in = midi_in
        .connect(
            in_port,
            "midir-read-input",
            move |stamp, message, _| {
                println!("{}: {:?} (len = {})", stamp, message, message.len());
            },
            (),
        )
        .unwrap();

    log(&format!(
        "Connection open, reading input from '{}'",
        in_port_name
    ));
    Box::leak(Box::new(_conn_in));

    debug("DONEEEE");
    Ok(true)
}

// fn run() -> Result<bool, Box<dyn Error>> {
//     let window = web_sys::window().expect("no global `window` exists");

//     let mut midi_in = MidiInput::new("midir reading input")?;
//     midi_in.ignore(Ignore::None);

//     // Get an input port
//     let ports = midi_in.ports();
//     let in_port = match &ports[..] {
//         [] => {
//             println!("No ports available yet, will try again");
//             return Ok(false);
//         }
//         [ref port] => {
//             println!(
//                 "Choosing the only available input port: {}",
//                 midi_in.port_name(port).unwrap()
//             );
//             port
//         }
//         _ => {
//             let mut msg = "Choose an available input port:\n".to_string();
//             for (i, port) in ports.iter().enumerate() {
//                 msg.push_str(format!("{}: {}\n", i, midi_in.port_name(port).unwrap()).as_str());
//             }
//             loop {
//                 if let Ok(Some(port_str)) = window.prompt_with_message_and_default(&msg, "0") {
//                     if let Ok(port_int) = port_str.parse::<usize>() {
//                         if let Some(port) = &ports.get(port_int) {
//                             break port.clone();
//                         }
//                     }
//                 }
//             }
//         }
//     };

//     println!("Opening connection");
//     let in_port_name = midi_in.port_name(in_port)?;

//     // _conn_in needs to be a named parameter, because it needs to be kept alive until the end of the scope
//     let _conn_in = midi_in.connect(
//         in_port,
//         "midir-read-input",
//         move |stamp, message, _| {
//             println!("{}: {:?} (len = {})", stamp, message, message.len());
//         },
//         (),
//     )?;

//     println!("Connection open, reading input from '{}'", in_port_name);
//     Box::leak(Box::new(_conn_in));
//     Ok(true)
// }
