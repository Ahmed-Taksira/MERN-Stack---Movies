"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import MoviesGrid from "./pages/MoviesGrid";
import EditMovie from "./pages/EditMovie";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/movies" element={<MoviesGrid />} />
          <Route path="/movies/edit" element={<EditMovie />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}
