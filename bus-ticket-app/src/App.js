import "./App.css";
import UserSignIn from "./components/userSignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserSignUp from "./components/userSignUp";
import AdminSignUp from "./components/adminSignUp";
import AdminSignIn from "./components/adminSignIn";
import AdminHome from "./components/adminHome";
import UserHome from "./components/userHome";
import UploadBus from "./components/UploadBus";
import TicketBooking from "./components/TicketBooking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserSignUp />} />
        <Route path="/user/signin" element={<UserSignIn />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/admin/uploadbus" element={<UploadBus />} />
        <Route path="/user/bus/:busid" element={<TicketBooking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
