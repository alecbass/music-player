use midly::{live::LiveEvent, MidiMessage};

pub fn note_on(channel: u8, key: u8) -> Vec<u8> {
    let ev = LiveEvent::Midi {
        channel: channel.into(),
        message: MidiMessage::NoteOn {
            key: key.into(),
            vel: 127.into(),
        },
    };
    let mut buf = Vec::new();
    ev.write(&mut buf).unwrap();

    buf
    // write_midi(&buf[..]);
}
