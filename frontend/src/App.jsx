// src/App.jsx
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute.jsx";

// PAGES
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp.jsx";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Search from "./Pages/Search.jsx";
import Listings from "./Pages/Listings";
import PropertyDetails from "./Pages/PropertyDetails";
import UpdateListing from "./Pages/UpdateListing.jsx";
import CreateListing from "./Pages/CreateListing.jsx";

// COMPONENTS
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// NOTIFICATIONS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<Listings />} />
        <Route path="/search" element={<Search />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/update-listing/:listingId" element={<UpdateListing />} />

        {/* PRIVATE ROUTES */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
        </Route>
      </Routes>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </BrowserRouter>
  );
}
