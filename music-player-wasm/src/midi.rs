use crate::note::Note;
use midly::{Format, Header, MetaMessage, MidiMessage, Smf, Timing, TrackEvent, TrackEventKind};

pub fn combine_notes(channel: u8, notes: Vec<Note>, tempo: u16, play_immediately: bool) -> Vec<u8> {
    let mut buffer = Vec::<u8>::new();

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
            delta: if play_immediately {
                0.into()
            } else {
                note.length.into()
            },
            kind: TrackEventKind::Midi {
                channel: channel.into(),
                message: MidiMessage::NoteOn {
                    key: note.key.clone().into(),
                    vel: 127.into(),
                },
            },
        };

        let track_event_off = TrackEvent {
            delta: if !play_immediately {
                0.into()
            } else {
                note.length.into()
            },
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

    let mut smf = Smf::new(Header::new(
        Format::Parallel,
        Timing::Metrical(tempo.into()),
    ));

    smf.tracks = vec![resulting_tracks];
    smf.write(&mut buffer).unwrap();

    buffer
}

pub fn handle_note(channel: u8, note: Note, tempo: u16) -> Vec<u8> {
    combine_notes(channel, vec![note], tempo, true)
}
