import React, { useLayoutEffect, useRef } from "react";
import { classNames } from "utils";

interface Props {
  /** e.g. "A5" */
  note: string;
  width?: string | number;
  isHovered?: boolean;
  onClick?: () => void;
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
  onDragEnter?: React.DragEventHandler<HTMLDivElement>;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
}

export function NoteBlock(props: Props) {
  const blockRef = useRef<HTMLDivElement | null>(null);
  const octave = props.note[1];

  useLayoutEffect(() => {
    if (blockRef.current) {
      blockRef.current.scrollIntoView();
    }
  }, []);

  return (
    <div
      draggable={!!props.onDragStart}
      ref={blockRef}
      className={classNames(
        "note",
        `note-${octave}`,
        props.isHovered && "highlighted",
        props.onClick && "clickable"
      )}
      style={{ flex: `0 0 ${props.width}` }}
      onClick={props.onClick}
      onDragStart={props.onDragStart}
      onDragEnter={props.onDragEnter}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={props.onDrop}
    >
      {props.note}
    </div>
  );
}
