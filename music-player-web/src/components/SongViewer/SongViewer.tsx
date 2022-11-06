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
  const [hoveringOverIndex, setHoveringOverIndex] = useState(-1);

  function handleNoteDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (e.target === rowRef.current) {
      return;
    }
  }

  function adjustNotes(note: Note, before: number) {
    console.debug("Before", before);

    props.onNotesChanged([
      ...props.notes.slice(0, before),
      note,
      ...props.notes.slice(before + 1),
    ]);
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

      setHoveringOverIndex(index);
    }

    function handlePreMarginDrop(e: React.DragEvent<HTMLDivElement>) {
      e.stopPropagation();
      console.debug(draggingNote);

      if (!draggingNote) {
        return;
      }

      adjustNotes(draggingNote, note.position);
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

      adjustNotes(draggingNote, note.position + 1);
    }

    const isHovered = hoveringOverIndex === index;
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
