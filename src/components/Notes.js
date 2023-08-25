import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "default",
  });

  const handleClick = (id) => {
    editNote(note._id, note.title, note.description, note.tag);
    // addNote(note.title, note.description, note.tag);
    refClose.current.click();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);
  const updateNote = (currentNote) => {
    // Show the modal
    ref.current.click();
    setNote(currentNote);
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <>
      <AddNote />
      <button
        className="d-none"
        ref={ref}
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="emailHelp"
                    name="title"
                    onChange={onChange}
                    value={note.title}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={onChange}
                    value={note.description}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    onChange={onChange}
                    value={note.tag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleClick(note._id)}
                className="btn btn-primary"
              >
                Edit Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="container">
          {notes.length === 0 && "No notes avialable!"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem updateNote={updateNote} key={note._id} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
