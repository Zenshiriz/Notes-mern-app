import React, { useState } from "react";
import NoteContest from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
 
  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
    try {
      const res = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
           localStorage.getItem("token"),
        },
      });
      const json = await res.json();
      setNotes(json);
      return json;
    } catch (error) {
      console.log("there was an error while getting all notes",error);
    }
  };

  const addNote = async (title, description, tag) => {
    try {
      const res = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
           localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: title,
          description: description,
          tag: tag,
        }),
      });
      const note = await res.json();
  
      setNotes(notes.concat(note));
      
    } catch (error) {
      console.log("there was an error while add note",error);
    }
  };

  const editNote = async (id, title, description, tag) => {
    try {
      const res = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
           localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: title,
          description: description,
          tag: tag,
        }),
      });
      const json = await res.json();
      const newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < notes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
      console.log(notes);
      console.log(json);
      
    } catch (error) {
      console.log("there was an error while editing note",error);

    }
  };

  const deleteNote = async (id) => {
  try {
    const res = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem("token"),
      },
    });
    const json = res.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    
  } catch (error) {
    console.log(error);
  }
  };

  return (
    <NoteContest.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote, getAllNotes }}
    >
      {props.children}
    </NoteContest.Provider>
  );
};

export default NoteState;
