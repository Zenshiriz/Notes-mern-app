import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./component/NavbarComponent";
import Home from "./pages/Home";
import About from "./pages/About";
import NoteState from "./context/notes/noteState";
import AlertComponent from "./component/AlertComponent";
import AddNote from "./component/AddNote";
import EditNote from "./component/EditNote";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import WelcomePage from "./component/WelcomePage";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, color) => {
    setAlert({
      message: message,
      color: color,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <NavbarComponent showAlert={showAlert} />
          <AlertComponent alert={alert}/>
          <Routes>

            <Route exact path="/welcome" element={<WelcomePage showAlert={showAlert} />} />
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/addnote" element={<AddNote showAlert={showAlert} />} />
            <Route exact path="/editnote/:id" element={<EditNote showAlert={showAlert} />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/createuser" element={<SignUp showAlert={showAlert} />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
