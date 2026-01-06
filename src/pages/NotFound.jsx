import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-8 bg-red-500/5">
      <h1 className="text-7xl font-bold text-red-500 text-center">
        404 Page Not Found!
      </h1>
      <button
        onClick={() => navigate("/")}
        className="h-[45px] w-[200px] bg-red-500 text-white rounded-sm hover:scale-105 transition-all"
      >
        Go to Home page
      </button>
    </div>
  );
};

export default NotFound;
