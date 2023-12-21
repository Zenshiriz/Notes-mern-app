import React, { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Avatar,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NavbarComponent(props) {
  const [openNav, setOpenNav] = React.useState(false);
  const locationPath = useLocation().pathname;
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    props.showAlert("logged out Successfully", "green");
  };
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to="/"
          className={`flex items-center ${
            useLocation().pathname === "/"
              ? " font-semibold text-deep-purple-900"
              : "text-deep-purple-200"
          } hover:text-deep-purple-500`}
        >
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        {localStorage.getItem("token") && (
          <Link
            to="/addnote"
            className={`flex items-center capitalize ${
              locationPath === "/addnote"
                ? " font-semibold text-deep-purple-900"
                : "text-deep-purple-200"
            } hover:text-deep-purple-500`}
          >
            Add a note
          </Link>
        )}
      </Typography>
    </ul>
  );
  return (
    <div className="sticky top-0 w-full z-50">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer text-xl py-1.5 font-bold text-deep-purple-500"
          >
            Note Book
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
         
            <div className="flex items-center gap-x-1">
              {localStorage.getItem("token") ? (
                <>
                   <div className=" items-center gap-4 hidden md:flex  border-blue-gray-50 mr-6">
                   <Avatar
                     src="https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-1.jpg"
                     alt="tania andrew"
                     className=" w-9 h-9"
                   />
                   <div className="">
                     <Typography variant="h6" color="blue-gray">
                      {localStorage.getItem("userName")}
                     </Typography>
                   </div>
                 </div>
                <Button
                  variant="outlined"
                  color="red"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={handleLogOut}
                >
                  <span>Log Out</span>
                </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block outline-1 outline text-deep-purple-400 outline-deep-purple-400"
                    onClick={() => navigate("/login")}
                  >
                    <span>Log In</span>
                  </Button>
                  <Button
                    variant=""
                    size="sm"
                    className="hidden lg:inline-block bg-deep-purple-500"
                    onClick={() => navigate("/createuser")}
                  >
                    <span>Sign Up</span>
                  </Button>
                </>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          {localStorage.getItem("token") ? (
            <div className="flex justify-between">
               <div className=" items-center gap-4 flex md:hidden  border-blue-gray-50 mr-6">
                   <Avatar
                     src="https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-1.jpg"
                     alt="tania andrew"
                     className=" w-9 h-9"
                   />
                   <div className="">
                     <Typography variant="h6" color="blue-gray">
                      {localStorage.getItem("userName")}
                     </Typography>
                   </div>
                 </div>
            <Button
              variant="outlined"
              color="red"
              size="sm"
              className="inline-block lg:hidden"
              onClick={handleLogOut}
            >
              <span>Log Out</span>
            </Button>
            </div>

          ) : (
            <div className="flex items-center gap-x-1">
              <Button
                fullWidth
                variant="text"
                size="sm"
                className=""
                onClick={() => navigate("/login")}
              >
                <span>Log In</span>
              </Button>
              <Button
                fullWidth
                variant="gradient"
                size="sm"
                className=""
                onClick={() => navigate("/createuser")}
              >
                <span>Sign Up</span>
              </Button>
            </div>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}
