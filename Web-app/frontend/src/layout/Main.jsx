import React from "react";
import { Outlet } from "react-router-dom";

import "../App.css";
import Footer from "../components/Footer";
import Navbarstart from "../components/Navbarstart";
import Start from "../components/Start";
import LoadingSpinner from "../components/LoadingSpinner";

const Main = () => {
  return (
    <div className="bg-prigmayBG">
      <div>
        <Navbarstart />
        <div className="min-h-screen">
          <Start />
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Main;