import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(props) {
  const history = useNavigate();

  const [body, setBody] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
    console.log(body);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: body.email, password: body.password }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem("token", data.authToken);
        localStorage.setItem("userName", data.userName);
        history("/");
        props.showAlert("Have logged in successfully", "green")
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
          Login
        </Typography>
        <Typography color="gray" className="mt-1 text-deep-purple-600 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3 text-deep-purple-800">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              name="email"
              value={body.email}
              required
              onChange={onChange}
              className=" !border-deep-purple-200 focus:!border-deep-purple-400"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3  text-deep-purple-800">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              name="password"
              onChange={onChange}
              value={body.password}
              minLength={6}
              placeholder="********"
              className=" !border-deep-purple-200 focus:!border-deep-purple-400"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button className="mt-6 bg-deep-purple-500" fullWidth onClick={handleSubmit}>
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't Have an account?{" "}
            <Link to="/createuser" className="font-medium text-deep-purple-900">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
