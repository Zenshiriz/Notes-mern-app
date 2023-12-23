import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
export default function WelcomePage() {
  const navigate = useNavigate()
  return (
    <>
      <div
        className="min-h-[calc(100vh-73px)] md:flex"
        style={{
          background: `linear-gradient(180deg, rgba(240,248,255,1) 57%, rgba(126,87,194,1) 100%)`,
        }}
      >
        <div className=" h-76 md:w-[50%]">
          <img
            src="https://images.pexels.com/photos/3944416/pexels-photo-3944416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="img"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="pt-5 md:w-[50%] md:flex md:flex-col md:justify-center">
          <div className="flex flex-col items-center">
            <Typography variant="h2" className=" text-deep-purple-400 mb-2">
              Welcome To Notes
            </Typography>
            <Typography variant="paragraph" className=" text-center text-deep-purple-300 max-w-[270px] capitalize leading-5">
              your one and only destination to save your all notes
            </Typography>
          </div>
          <div className="flex flex-col gap-4 items-center mt-[25%]  pb-6">
            <Button className="bg-white text-deep-purple-400 text-sm min-w-[250px]" onClick={()=> navigate("/login")}>Login to Enter</Button>
            <Button className="bg-white text-deep-purple-400 text-sm min-w-[250px]" onClick={()=> navigate("/createuser")}>create an account</Button>
          </div>
        </div>
      </div>
    </>
  );
}
