use crate::log;
use midly::{live::LiveEvent, Format, Fps, Header, MidiMessage, Smf, Timing, Arena};

pub fn on_midi(event: &[u8]) {
    let event = LiveEvent::parse(event).unwrap();
    match event {
        LiveEvent::Midi { channel, message } => match message {
            MidiMessage::NoteOn { key, vel } => {
                log(&format!("hit note {} on channel {}", key, channel));
            }
            _ => {}
        },
        _ => {}
    }
}

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

    on_midi(&buf);

    buf
}

pub fn combine_notes(channel: u8, notes: &[u8]) -> Vec<u8> {
    let mut buffer = Vec::<u8>::new();

    for note in notes {
        let ev = LiveEvent::Midi {
            channel: channel.into(),
            message: MidiMessage::NoteOn {
                key: note.clone().into(),
                vel: 127.into(),
            },
        };
        ev.as_track_event(Arena::)

        ev.write(&mut buffer).unwrap();
    }

    // TODO: Try create a new MIDI file
    let smf = Smf::new(Header::new(
        Format::SingleTrack,
        Timing::Timecode(Fps::Fps30, 30),
    ));
    smf.tracks[0][0].kind.as_live_event().unwrap()
    let mut result_buffer = Vec::new();
    log(&format!("Returning length {}", buffer.len()));

    buffer
}
