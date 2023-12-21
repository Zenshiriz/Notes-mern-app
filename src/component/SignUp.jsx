import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Card, Input, Button, Typography } from "@material-tailwind/react";

export default function SignUp(props) {
  const history = useNavigate();
  const [body, setBody] = useState({ name: "", email: "", password: "" });
  const onChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
    console.log(body);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          password: body.password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem("token", data.authToken);
        localStorage.setItem("userName", data.userName);
        history("/");
        props.showAlert("created user successfully", "green")

      }else{
        props.showAlert(`login failed`, "red")
      }
    } catch (error) {
      props.showAlert(`login failed ${error.message}`, "red")
      console.log(error.message);
    }
  };
  return (
    <div className="py-4 min-h-[calc(100vh - 50px)] flex items-center">
      <Card color="transparent" shadow={false} className="max-w-fit mx-auto">
        <Typography variant="h4" color="blue-gray" className=" text-deep-purple-900">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-deep-purple-600">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3 text-deep-purple-800">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              name="name"
              required
              minLength={3}
              onChange={onChange}
              className=" !border-t-deep-purple-200 focus:!border-deep-purple-400"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3 text-deep-purple-800">
              Your Email
            </Typography>
            <Input
              size="lg"
              name="email"
              placeholder="name@mail.com"
              required
              onChange={onChange}
              className=" !border-t-deep-purple-200 focus:!border-deep-purple-400"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3 text-deep-purple-800">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              name="password"
              required
              minLength={6}
              onChange={onChange}
              placeholder="********"
              className=" !border-deep-purple-200 focus:!border-deep-purple-400"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button className="mt-6 bg-deep-purple-500" fullWidth onClick={handleSubmit}>
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/" className="font-medium text-deep-purple-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
