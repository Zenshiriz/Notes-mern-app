import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useContext } from "react";
import NoteContest from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";


export default function NoteItem(props) {
  const { notes } = props;
  const deleteHandle = ()=>{
    deleteNote(notes._id) 
    props.showAlert("note deleted successfully", 'green')
  }
  const navigate = useNavigate()
  const context  = useContext(NoteContest)
  const {deleteNote} = context
  const updateNote = ()=>{
   navigate(`/editnote/${notes._id}`)
  }
  return (
    <>
      <Card className="mt-8 mr-5  w-[384px] max-w-[384px]">
        <CardBody>
          <Typography variant="h5" color="blue-gray"  className="mb-2 text-deep-purple-500 capitalize">
            {notes.title}
          </Typography>
          <Typography>{notes.description}</Typography>
        </CardBody>
        <CardFooter className="pt-0 flex gap-2">
          <Button variant="outlined" size="sm" color="green" className="flex" onClick={updateNote}><FaRegEdit className=" text-base"/></Button>
          <Button variant="outlined" size="sm" color="red" className="flex" onClick={deleteHandle}> <MdOutlineDelete className=" text-base"/></Button>
        </CardFooter>
      </Card>
    </>
  );
}
