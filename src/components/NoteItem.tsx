import React from "react";

type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type NoteItemProps = {
  note: Note;
  onClick: () => void;
  onDelete: (event: React.MouseEvent) => void;
};

const NoteItem: React.FC<NoteItemProps> = ({ note, onClick, onDelete }) => {
  return (
    <div className="note-item" onClick={onClick}>
      <div className="notes-header">
        <div className="note-dates">
          {note.updatedAt !== note.createdAt ? (
            <small>Updated: {new Date(note.updatedAt).toLocaleString()}</small>
          ) : (
            <small>Created: {new Date(note.createdAt).toLocaleString()}</small>
          )}
        </div>
        <button onClick={onDelete}>x</button>
      </div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
};

export default NoteItem;
