import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./sites/Home.jsx";
import Login from "./sites/Login.jsx";
import Register from "./sites/Register.jsx";
import Mega from "./sites/MegaXO.jsx";
import Timer from "./sites/TimerXO.jsx";
import Normal from "./sites/NormalXO.jsx";
import User from "./sites/User.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="mega" element={<Mega />} />
        <Route path="timer" element={<Timer />} />
        <Route path="normal" element={<Normal />} />
        <Route path="user" element={<User />} />
      </Routes>
    </Router>
  </StrictMode>
);
