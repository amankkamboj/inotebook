import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = process.env.REACT_APP_API_URL;
  const notesInitials = [];

  const [notes, setNotes] = useState(notesInitials);
  //Get all notes
  const getNotes = async () => {
    // TODO :API CAL

    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //add a note
  const addNote = async (title, description, tag) => {
    // TODO :API CAL
    const data = { title, description, tag };
    const url = `${host}/api/notes/addnote/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    const json_note = await response.json();
    setNotes(notes.concat(json_note));
  };
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // Call API
    const data = { title: title, description: description, tag: tag };
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    const json_data = await response.json();
    let newNotes  = JSON.parse(JSON.stringify(notes));
    //Login for edit in client side
    console.log(json_data);
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
  };
  // delete a note
  const deleteNote = async (id) => {
    // TODO : Api call

    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // setNotes(json);
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
