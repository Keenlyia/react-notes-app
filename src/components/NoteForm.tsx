import React from "react";

type NoteFormProps = {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
};

const NoteForm: React.FC<NoteFormProps> = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  return (
    <form className="note-form" onSubmit={onSubmit}>
      <input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Content"
        rows={10}
        required
      />
      {isEditing ? (
        <div className="edit-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <button type="submit">Add note</button>
      )}
    </form>
  );
};

export default NoteForm;
