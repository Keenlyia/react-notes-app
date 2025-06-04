import React, { useState, useEffect } from "react";

import "./App.css";

type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          "https://serene-refuge-26752-95762fc55f1b.herokuapp.com/notes"
        );
        const notes: Note[] = await response.json();
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://serene-refuge-26752-95762fc55f1b.herokuapp.com/notes",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );
      const newNote = await response.json();
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) return;

    try {
      const response = await fetch(
        `https://serene-refuge-26752-95762fc55f1b.herokuapp.com/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      const updatedNote = await response.json();

      const updatedNotesList = notes.map((note) =>
        note.id === selectedNote.id ? updatedNote : note
      );

      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = async (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    try {
      await fetch(
        `https://serene-refuge-26752-95762fc55f1b.herokuapp.com/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );

      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
      setSelectedNote(null);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search notes by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <form
        className="note-form"
        onSubmit={selectedNote ? handleUpdateNote : handleSubmit}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={10}
          required
        />
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add note</button>
        )}
      </form>
      <div className="notes-grid">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="note-item"
            onClick={() => handleNoteClick(note)}
          >
            <div className="notes-header">
              <div className="note-dates">
                {note.updatedAt !== note.createdAt ? (
                  <small>
                    Updated: {new Date(note.updatedAt).toLocaleString()}
                  </small>
                ) : (
                  <small>
                    Created: {new Date(note.createdAt).toLocaleString()}
                  </small>
                )}
              </div>
              <button onClick={(event) => deleteNote(event, note.id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
