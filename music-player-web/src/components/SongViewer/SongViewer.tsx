import type { Note } from "interface/Note";
import React, { useEffect, useRef, useState } from "react";
import { classNames } from "utils";
import { NoteBlock } from "./NoteBlock";

interface Props {
  notes: Note[];
  onNotesChanged: (note: Note[]) => void;
}

export function SongViewer(props: Props) {
  const [draggingNote, setDraggingNote] = useState<Note | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [hoveringOver, setHoveringOver] = useState<Note | null>(null);

  function handleNoteDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (e.target === rowRef.current) {
      return;
    }
  }

  function adjustNotes(note: Note, after: number) {
    const filtered = props.notes.filter((n) => n.id !== note.id);
    console.debug("After", after);

    if (after === -1) {
      // console.debug([note, ...filtered].map((n) => n.key));
      props.onNotesChanged([note, ...filtered]);
      return;
    }

    const result = [
      ...filtered.slice(0, after),
      note,
      ...filtered.slice(after),
    ];
    // console.debug(result.map((n) => n.key));
    props.onNotesChanged(result);
  }

  function renderNote(note: Note, index: number) {
    function handleClick() {}

    function handleDrag() {
      setDraggingNote(note);
      console.debug(note);
    }

    function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
      e.stopPropagation();
      if (!draggingNote) {
        return;
      }

      setHoveringOver(note);
    }

    function handlePreMarginDrop(e: React.DragEvent<HTMLDivElement>) {
      e.stopPropagation();
      console.debug(draggingNote);

      if (!draggingNote) {
        return;
      }

      adjustNotes(draggingNote, index);
    }

    function handleNoteDrop(e: React.DragEvent<HTMLDivElement>) {
      e.stopPropagation();
      console.debug(draggingNote);

      if (!draggingNote) {
        return;
      }

      // adjustNotes(draggingNote, note.position);
    }

    function handlePostMarginDrop(e: React.DragEvent<HTMLDivElement>) {
      e.stopPropagation();
      console.debug(draggingNote);

      if (!draggingNote) {
        return;
      }

      adjustNotes(draggingNote, index + 1);
    }

    const isHovered = hoveringOver?.id === note.id;
    const noteWidth = `${(note.length * 2) / 100}rem`;

    return (
      <React.Fragment key={index}>
        <div
          className={classNames("note-margin", isHovered && "active")}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={handlePreMarginDrop}
        />
        <NoteBlock
          note={note.key}
          isHovered={isHovered}
          width={noteWidth}
          onClick={handleClick}
          onDragStart={handleDrag}
          onDragEnter={handleDragEnter}
          onDrop={handleNoteDrop}
        />
        <div
          className={classNames("note-margin", isHovered && "active")}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={handlePostMarginDrop}
        />
      </React.Fragment>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="song-viewer-wrapper"
      onDragEnter={handleNoteDragEnter}
    >
      <div ref={rowRef} className={"song-viewer-row"}>
        {props.notes.map(renderNote)}
      </div>
    </div>
  );
}
