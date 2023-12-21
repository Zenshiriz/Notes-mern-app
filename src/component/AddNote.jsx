import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContest from "../context/notes/noteContext";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
export default function AddNote(props) {
  const navigate = useNavigate()
  const context = useContext(NoteContest);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const onClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert('Added Note Successfully', "green")
    navigate("/")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    console.log(note);
  };
  return (
    <div>
      <Card
        color="transparent"
        className=" max-w-fit m-auto mt-6"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray" className="text-deep-purple-900">
          ADD A NOTE
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-deep-purple-600">
          Nice to meet you! Enter your details to a note.
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
              color=""
              placeholder="Enter your title"
              onChange={onChange}
              minLength={3}
              required
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
              onChange={onChange}
              minLength={5}
              required
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
              placeholder="Enter your description"
              onChange={onChange}
              className=" !border-t-blue-gray-200 focus:!border-deep-purple-400"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button className="mt-6 bg-deep-purple-500" onClick={onClick} disabled={note.title.length < 3 || note.description.length < 5} fullWidth>
            ADD NOTE
          </Button>
        </form>
      </Card>
    </div>
  );
}
