import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./js/Login";
import Home from "./js/Home";

export default function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home user={user} setUser={setUser} /> : <Login setUser={setUser} />} />
        <Route path="/home" element={user ? <Home user={user} setUser={setUser} /> : <Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
}
