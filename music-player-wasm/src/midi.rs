use crate::{log, note::Note};
use midly::{
    live::LiveEvent, Format, Fps, Header, MetaMessage, MidiMessage, Smf, Timing, TrackEvent,
    TrackEventKind,
};

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

pub fn combine_notes(channel: u8, notes: Vec<Note>) -> Vec<u8> {
    let mut buffer = Vec::<u8>::new();
    log(&format!("Combining {} notes", notes.len()));

    let track_events: Vec<Vec<TrackEvent>> = notes
        .iter()
        .map(|note| {
            let track_event_on = TrackEvent {
                delta: 1.into(),
                kind: TrackEventKind::Midi {
                    channel: channel.into(),
                    message: MidiMessage::NoteOn {
                        key: note.key.clone().into(),
                        vel: 127.into(),
                    },
                },
            };

            let track_event_off = TrackEvent {
                delta: 1.into(),
                kind: TrackEventKind::Midi {
                    channel: channel.into(),
                    message: MidiMessage::NoteOff {
                        key: note.key.clone().into(),
                        vel: 127.into(),
                    },
                },
            };

            let track_event_end = TrackEvent {
                delta: 1.into(),
                kind: TrackEventKind::Meta(MetaMessage::EndOfTrack),
            };

            vec![track_event_on, track_event_off, track_event_end]
        })
        .collect();

    // TODO: Try create a new MIDI file
    let mut smf = Smf::new(Header::new(
        Format::SingleTrack,
        Timing::Timecode(Fps::Fps30, 30),
    ));

    smf.tracks = track_events;

    log(&format!("{:?}", smf.tracks));

    smf.write(&mut buffer).unwrap();

    log(&format!("Returning length {}", buffer.len()));

    buffer
}
