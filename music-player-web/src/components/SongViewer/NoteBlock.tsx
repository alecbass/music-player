interface Props {
  /** e.g. "A5" */
  note: string;
  width?: string | number;
  onClick?: () => void;
}

export function NoteBlock(props: Props) {
  const [, octave] = props.note;

  return (
    <div
      className={`note note-${octave}`}
      style={{ width: props.width }}
      onClick={props.onClick}
    >
      {props.note}
    </div>
  );
}
