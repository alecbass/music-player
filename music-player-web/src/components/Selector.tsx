import { NoteBlock } from "./SongViewer/NoteBlock";
import { noteToMidi } from "./KeyBoard/const";

interface Props {
  onNoteSelected: (note: string) => void;
}

export function Selector(props: Props) {
  function renderNote(noteKey: string) {
    function handleClick() {
      props.onNoteSelected(noteKey);
    }

    return <NoteBlock key={noteKey} note={noteKey} onClick={handleClick} />;
  }

  return (
    <div className="note-selector">
      {Object.keys(noteToMidi).map(renderNote)}
    </div>
  );
}
