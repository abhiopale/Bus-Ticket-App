import "./App.css";
import UserSignIn from "./components/userSignIn";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import UserSignUp from "./components/userSignUp";
import AdminSignUp from "./components/adminSignUp";
import AdminSignIn from "./components/adminSignIn";
import UserHome from "./components/userHome";
import UploadBus from "./components/UploadBus";
import TicketBooking from "./components/TicketBooking";
import YourTickets from "./components/YourTickets";
import YourBus from "./components/YourBus";
import AdminSales from "./components/adminSales";

function App() {
  return (
    <SnackbarProvider maxSnack={3} sx={{ color: "red" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserSignUp />} />

          <Route path="/user/signin" element={<UserSignIn />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />

          <Route
            path="/admin/home"
            element={
              localStorage.adminToken ? (
                <UploadBus />
              ) : (
                <Navigate to="/admin/signin"></Navigate>
              )
            }
          />
          <Route
            path="/admin/yourbus"
            element={
              localStorage.adminToken ? (
                <YourBus />
              ) : (
                <Navigate to="/admin/signin"></Navigate>
              )
            }
          />
          <Route
            path="/admin/bus/:busid"
            element={
              localStorage.adminToken ? (
                <AdminSales />
              ) : (
                <Navigate to="/admin/signin"></Navigate>
              )
            }
          />

          <Route
            path="/user/home"
            element={
              localStorage.userToken ? (
                <UserHome />
              ) : (
                <Navigate to="/user/signin"></Navigate>
              )
            }
          />
          <Route
            path="/user/bus/:busid"
            element={
              localStorage.userToken ? (
                <TicketBooking />
              ) : (
                <Navigate to="/user/signin"></Navigate>
              )
            }
          />
          <Route
            path="/user/yourticket"
            element={
              localStorage.userToken ? (
                <YourTickets />
              ) : (
                <Navigate to="/user/signin"></Navigate>
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
