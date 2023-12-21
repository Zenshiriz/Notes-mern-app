import React, { useContext, useEffect, useState } from "react";
import NoteContest from "../context/notes/noteContext";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
export default function EditNote(props) {
  const naviggate =     useNavigate()

  const context = useContext(NoteContest);
  const params = useParams();
  const { id } = params;
  const { getAllNotes , editNote } = context;
  const [note, setNote] = useState({
    id:'',
    title: "",
    description: "",
    tag: "default",
  });
  const onClick = (e) => {
    e.preventDefault();
    editNote(note.id,note.title, note.description,note.tag)
    props.showAlert("Updated Note Successfully!",'green');
    naviggate("/")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    console.log(note);
  };
  useEffect(() => {
    async function getNotes() {
      const allNote = await getAllNotes();
      const findNote = allNote.filter((note) => note._id === id);
      console.log(findNote)
      console.log(id)
      setNote({
          id: findNote[0]._id,
          title: findNote[0].title,
        description: findNote[0].description,
        tag: findNote[0].tag,
      });
      return findNote;
    }
    getNotes();
  }, []); // Empty dependency array

  return (
    <div className="min-h-[calc(100vh - 50px)] flex items-center">
      <Card
        color="transparent"
        className=" max-w-fit m-auto mt-3"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray" className="text-deep-purple-900">
          Edit Note
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-deep-purple-600">
          Nice to meet you! Enter your details to update.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3 text-deep-purple-800">
              Title
            </Typography>
            <Input
              size="lg"
              name="title"
              type="text"
              value={note.title}
              minLength={3}
              required
              placeholder="Enter your title"
              onChange={onChange}
              className=" !border-deep-purple-200 focus:!border-deep-purple-400"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3 text-deep-purple-800">
              description
            </Typography>
            <Input
              size="lg"
              name="description"
              placeholder="Enter your description"
              minLength={5}
              required
              value={note.description}
              onChange={onChange}
              className=" !border-deep-purple-200 focus:!border-deep-purple-400"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3 text-deep-purple-800">
              Tag
            </Typography>
            <Input
              size="lg"
              name="tag"
              placeholder="Enter your tag" 
              value={note.tag}
              onChange={onChange}
              className=" !border-deep-purple-200 focus:!border-deep-purple-400"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button className="mt-6 bg-deep-purple-400" onClick={onClick} disabled={note.title.length < 3 || note.description.length <  5} fullWidth>
            UPDATE NOTE
          </Button>
        </form>
      </Card>
    </div>
  );
}
