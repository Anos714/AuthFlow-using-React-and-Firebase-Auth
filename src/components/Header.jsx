import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [profileBtnClick, setProfileBtnClick] = useState(false);

  return (
    <div className="h-screen w-screen bg-blue-400/10 flex flex-col">
      <div className="flex justify-between items-center px-10 py-3 bg-blue-600/10 border-b-1 border-blue-500/10">
        <div>
          <p
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            AuthFlow
          </p>
        </div>
        <div className="relative">
          {user?.photoURL ? (
            <img
              src={user?.photoURL}
              alt="profile pic"
              className="h-[50px] w-[50px] rounded-full cursor-pointer"
              onClick={() => setProfileBtnClick((prev) => !prev)}
            />
          ) : (
            <FaUserCircle
              className="h-[40px] w-[40px] cursor-pointer"
              onClick={() => setProfileBtnClick((prev) => !prev)}
            />
          )}

          {profileBtnClick ? (
            <div className="bg-blue-500/30 absolute flex flex-col top-17 right-0">
              <button
                className="h-[50px] w-[200px] font-semibold hover:bg-blue-500/40 transition-all cursor-pointer text-start px-8"
                onClick={() => navigate("/user-profile")}
              >
                Profile
              </button>
              <button
                className="h-[50px] w-[200px] font-semibold hover:bg-blue-500/40 transition-all cursor-pointer text-start px-8"
                onClick={handleLogout}
              >
                Reset Password
              </button>
              <button
                className="h-[50px] w-[200px] font-semibold hover:bg-blue-500/40 transition-all cursor-pointer text-start px-8"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="mt-[200px]">
        <p className="text-center text-5xl font-semibold">
          Welcome <span className="text-blue-700">{user.displayName}</span>!
        </p>
      </div>
    </div>
  );
};

export default Header;
