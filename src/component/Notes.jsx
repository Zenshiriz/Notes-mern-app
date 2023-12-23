import React, { useContext, useEffect } from "react";
import NoteContest from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import AddNoteComponent from "./AddNoteComponent";

export default function Notes(props) {
  const context = useContext(NoteContest);
  const navigate = useNavigate()
  const { notes,getAllNotes, setNotes} = context;
  useEffect(()=>{
    if(localStorage.getItem("token")){
      getAllNotes()
    }else{
      navigate("/welcome");
    }
  },[])
  return (
    <div>
      <h2 className="mx-8 font-bold uppercase text-xl my-6 text-deep-purple-900">Your Notes</h2>
    <div className=" mx-8  flex flex-wrap  items-center justify-center ">
      {notes.length === 0  && <div className=" text-gray-900 flex  w-full items-center justify-center text-3xl font-bold">No Notes Available</div>}
      {notes.map((note) => {
        return <NoteItem notes={note} key={note._id} showAlert={props.showAlert}/>
      })}
      <AddNoteComponent/>
    </div>

    </div>
  );
}
