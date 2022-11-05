use crate::{log, note::Note};
use midly::{
    live::LiveEvent, Format, Header, MetaMessage, MidiMessage, Smf, Timing, TrackEvent,
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

pub fn combine_notes(channel: u8, notes: Vec<Note>, tempo: u16) -> Vec<u8> {
    let mut buffer = Vec::<u8>::new();
    log(&format!("Combining {} notes", notes.len()));

    let mut resulting_tracks: Vec<TrackEvent> = Vec::new();

    resulting_tracks.push(TrackEvent {
        delta: 0.into(),
        kind: TrackEventKind::Midi {
            channel: 0.into(),
            message: MidiMessage::Controller {
                controller: 0.into(),
                value: 121.into(),
            },
        },
    });
    resulting_tracks.push(TrackEvent {
        delta: 0.into(),
        kind: TrackEventKind::Midi {
            channel: 0.into(),
            message: MidiMessage::Controller {
                controller: 0.into(),
                value: 0.into(),
            },
        },
    });
    resulting_tracks.push(TrackEvent {
        delta: 0.into(),
        kind: TrackEventKind::Midi {
            channel: 0.into(),
            message: MidiMessage::ProgramChange { program: 33.into() },
        },
    });

    for note in notes {
        let track_event_on = TrackEvent {
            delta: 0.into(),
            kind: TrackEventKind::Midi {
                channel: channel.into(),
                message: MidiMessage::NoteOn {
                    key: note.key.clone().into(),
                    vel: 127.into(),
                },
            },
        };

        let track_event_off = TrackEvent {
            delta: note.length.into(),
            kind: TrackEventKind::Midi {
                channel: channel.into(),
                message: MidiMessage::NoteOff {
                    key: note.key.clone().into(),
                    vel: 127.into(),
                },
            },
        };

        let track_event_end = TrackEvent {
            delta: 0.into(),
            kind: TrackEventKind::Meta(MetaMessage::EndOfTrack),
        };
        resulting_tracks.push(track_event_on);
        resulting_tracks.push(track_event_off);
        resulting_tracks.push(track_event_end);
    }

    // let mut track_events: Vec<Vec<TrackEvent>> = notes
    //     .iter()
    //     .map(|note| {
    //         let track_event_on = TrackEvent {
    //             delta: 60.into(),
    //             kind: TrackEventKind::Midi {
    //                 channel: channel.into(),
    //                 message: MidiMessage::NoteOn {
    //                     key: note.key.clone().into(),
    //                     vel: 127.into(),
    //                 },
    //             },
    //         };

    //         let track_event_off = TrackEvent {
    //             delta: 0.into(),
    //             kind: TrackEventKind::Midi {
    //                 channel: channel.into(),
    //                 message: MidiMessage::NoteOff {
    //                     key: note.key.clone().into(),
    //                     vel: 127.into(),
    //                 },
    //             },
    //         };

    //         let track_event_end = TrackEvent {
    //             delta: 0.into(),
    //             kind: TrackEventKind::Meta(MetaMessage::EndOfTrack),
    //         };

    //         vec![track_event_on, track_event_off, track_event_end]
    //     })
    //     .collect();

    // resulting_notes.append(track_events.into_iter().collect());

    // TODO: Try create a new MIDI file
    let mut smf = Smf::new(Header::new(
        Format::Parallel,
        Timing::Metrical(tempo.into()),
    ));

    smf.tracks = vec![resulting_tracks];

    log(&format!("Header: {:?}", smf.header));
    log(&format!("Tracks: {:?}", smf.tracks));

    smf.write(&mut buffer).unwrap();

    buffer
}
