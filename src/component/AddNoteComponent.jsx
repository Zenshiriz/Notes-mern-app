import React from 'react'
import {
    Card,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  import { IoIosAdd } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function AddNoteComponent() {
  return (
    <Link to='/addnote'>
        <Card className="mt-8 mr-5  w-[200px] max-w-[200px] min-h-[167px] flex items-center">
        <CardBody>
            <Typography className='text-deep-purple-500'>Add A Note</Typography>
          <Typography variant="h5" color="blue-gray"  className="mb-2 text-deep-purple-500 capitalize flex justify-center items-center">
          <IoIosAdd className=' text-7xl'/>
          </Typography>
        </CardBody>
      </Card>
    </Link>
  )
}
