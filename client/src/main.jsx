import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import AllEvents from "./pages/AllEvents.jsx";
import YourEvents from "./pages/YourEvents.jsx";
import Navbar from "./components/Navbar.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllEvents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/my-events" element={<YourEvents />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
