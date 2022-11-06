import type { Note } from "interface/Note";
import React, { useEffect, useRef, useState } from "react";
import { classNames } from "utils";
import { NoteBlock } from "./NoteBlock";

interface Props {
  notes: Note[];
  /** Key of new note being dragged */
  draggingNewNote: string | null;
  onNewNoteDropped?: (afterIndex: number) => void;
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

  function handleNewNoteDrop(e: React.DragEvent<HTMLDivElement>) {
    e.stopPropagation();

    if (props.draggingNewNote && props.onNewNoteDropped) {
      props.onNewNoteDropped(props.notes.length);
    }
  }

  function adjustNotes(note: Note, after: number) {
    const filtered = props.notes.filter((n) => n.id !== note.id);

    if (after === -1) {
      props.onNotesChanged([note, ...filtered]);
      return;
    }

    const result = [
      ...filtered.slice(0, after),
      note,
      ...filtered.slice(after),
    ];
    props.onNotesChanged(result);
  }

  function renderNote(note: Note, index: number) {
    function handleClick() {}

    function handleDrag() {
      setDraggingNote(note);
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

      if (props.draggingNewNote && props.onNewNoteDropped) {
        props.onNewNoteDropped(index);
        return;
      }

      if (!draggingNote) {
        return;
      }

      adjustNotes(draggingNote, index);
    }

    function handleNoteDrop(e: React.DragEvent<HTMLDivElement>) {
      e.stopPropagation();

      const rect = e.currentTarget.getBoundingClientRect();
      const diff = e.pageX - rect.x;

      // Did this drop happen on the left hand side of the div
      const droppedOnLeft = diff < rect.width / 2;

      if (props.draggingNewNote && props.onNewNoteDropped) {
        props.onNewNoteDropped(droppedOnLeft ? index : index + 1);
        return;
      }

      if (!draggingNote || draggingNote.id === note.id) {
        return;
      }

      if (droppedOnLeft) {
        adjustNotes(draggingNote, index);
      } else {
        adjustNotes(draggingNote, index + 1);
      }
    }

    function handlePostMarginDrop(e: React.DragEvent<HTMLDivElement>) {
      e.stopPropagation();

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
      <div
        ref={rowRef}
        className={"song-viewer-row"}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={handleNewNoteDrop}
      >
        {props.notes.map(renderNote)}
      </div>
    </div>
  );
}
