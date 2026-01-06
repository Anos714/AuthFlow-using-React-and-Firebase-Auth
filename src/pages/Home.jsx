import React from "react";
import heroImg from "../assets/goku.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePageRedirect = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="h-screen w-screen bg-green-600/5 flex flex-col items-center gap-2">
      <div className="flex flex-col items-center gap-4">
        <p className="text-center text-7xl font-bold w-[70%] mt-2">
          Hello {user?.displayName}{" "}
          <span className="text-blue-600 text-center">Welcome</span> to the app{" "}
        </p>
        <button
          className="h-[45px] w-[200px] bg-green-500 hover:scale-105 text-white rounded-md transition-all cursor-pointer"
          onClick={handlePageRedirect}
        >
          {user ? "Go to Profile page" : "Go to Login page"}
        </button>
      </div>
      <div>
        <img
          src={heroImg}
          alt="image"
          className="w-[800px] mt-5 shadow-lg shadow-blue-600/20 rounded-sm"
        />
      </div>
    </div>
  );
};

export default Home;
