"use client";

import { useState, useEffect } from "react";

export default function MyNotebook() {
  const [notes, setNotes] = useState<
    { text: string; timestamp: string; lastEdited: string | null }[]
  >([]);
  const [currentNote, setCurrentNote] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse saved notes", e);
      }
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = () => {
    if (!currentNote.trim()) return;

    if (editingIndex !== null) {
      // Update existing note
      const updatedNotes = [...notes];
      updatedNotes[editingIndex] = {
        text: currentNote,
        timestamp: new Date().toLocaleString(),
        lastEdited: new Date().toLocaleString(),
      };
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      // Add new note
      setNotes([
        ...notes,
        {
          text: currentNote,
          timestamp: new Date().toLocaleString(),
          lastEdited: null,
        },
      ]);
    }

    setCurrentNote("");
  };

  const handleEditNote = (index: number) => {
    setCurrentNote(notes[index].text);
    setEditingIndex(index);
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Notebook</h1>

      <div className="mb-6">
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="Write your note here..."
          className="w-full p-3 border border-gray-300 rounded-md min-h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ zIndex: 10 }}
          
        />

        <div className="flex justify-end mt-2">
          {editingIndex !== null && (
            <button
              onClick={() => {
                setCurrentNote("");
                setEditingIndex(null);
              }}
              className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          )}

          <button
            onClick={handleSaveNote}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            type="button"
          >
            {editingIndex !== null ? "Update Note" : "Save Note"}
          </button>
        </div>
      </div>

      {notes.length > 0 ? (
        <div className="space-y-4">
          {notes.map((note, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-md">
              <p className="whitespace-pre-wrap">{note.text}</p>

              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <div>
                  <p>Created: {note.timestamp}</p>
                  {note.lastEdited && <p>Edited: {note.lastEdited}</p>}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditNote(index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          No notes yet. Create your first note above!
        </p>
      )}
    </div>
  );
}
