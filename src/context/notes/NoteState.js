import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitials = [
    {
      _id: "64e1f77b21f70e6bf591dc15",
      user: "64e086715e402dcc3961db2e",
      title: "My 2nd note",
      description: "Open your window in the night",
      tag: "personal",
      timestamp: "2023-08-20T11:22:35.980Z",
      __v: 0,
    },
    {
      _id: "64e1f78421f70e6bf591dc18",
      user: "64e086715e402dcc3961db2e",
      title: "My 2nd note",
      description: "Open your window in the night",
      tag: "personal",
      timestamp: "2023-08-20T11:22:44.910Z",
      __v: 0,
    },
    {
      _id: "64e1f77b21f70e6bf591dc1e5",
      user: "64e086715e402dcc3961db2e",
      title: "My 2nd note",
      description: "Open your window in the night",
      tag: "personal",
      timestamp: "2023-08-20T11:22:35.980Z",
      __v: 0,
    },
    {
      _id: "64e1f78421f70e6bf591dcr18",
      user: "64e086715e402dcc3961db2e",
      title: "My 2nd note",
      description: "Open your window in the night",
      tag: "personal",
      timestamp: "2023-08-20T11:22:44.910Z",
      __v: 0,
    },
    {
      _id: "64e1f77b21fe70e6bf591dc15",
      user: "64e086715e402dcc3961db2e",
      title: "My 2nd note",
      description: "Open your window in the night",
      tag: "personal",
      timestamp: "2023-08-20T11:22:35.980Z",
      __v: 0,
    },
    {
      _id: "64e1f78421ff70e6bf591dc18",
      user: "64e086715e402dcc3961db2e",
      title: "My 2nd note",
      description: "Open your window in the night",
      tag: "personal",
      timestamp: "2023-08-20T11:22:44.910Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitials);
  //add a note
  const addNote = (title, description, tag) => {
    // TODO :API CAL
    const note = {
      _id: "64e1f78421ff70e6bf591dc18",
      user: "64e086715e402dcc3961db2e",
      title: title,
      description: description,
      tag: tag,
      timestamp: "2023-08-20T11:22:44.910Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // Call API
    // const url ="";
    // const response = await fetch(url, {
    //   method: "POST", 
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
     
    //   body: JSON.stringify(data), 

    // });

    //Login for edit in client side
    console.log(`Editing ${id}`);
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  // delete a note
  const deleteNote = (id) => {
    // TODO : Api call
    console.log(`Deleting ${id}`);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
