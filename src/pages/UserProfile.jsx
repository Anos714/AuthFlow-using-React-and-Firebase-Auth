import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Context";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { updateEmail, updateProfile } from "firebase/auth";

const UserProfile = () => {
  const { user } = useAuth();
  const [usernameClick, setUsernameClick] = useState(false);
  const [emailClick, setEmailClick] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  // useEffect(() => {
  //   if (user) {
  //     setUpdatedName(user.displayName || "");
  //     setUpdatedEmail(user.email || "");
  //   }
  // });

  const handleUpdateProfile = async () => {
    try {
      if (updatedName !== user.displayName) {
        await updateProfile(user, {
          displayName: "Anos",
        });
      }

      if (updatedEmail !== user.email) {
        await updateEmail(user, updatedEmail);
      }

      toast.success("Profile updated successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
      if (error.code === "auth/operation-not-allowed") {
        toast.error("Please verify the new email before changing email.");
      } else {
        toast.error("Something wrong occurred");
      }
    }
  };
  const handleCancelChanges = () => {
    if (usernameClick || emailClick) {
      setUsernameClick(false);
      setEmailClick(false);
    } else if (usernameClick) {
      setUsernameClick(false);
    } else if (emailClick) {
      setEmailClick(false);
    }
  };
  return (
    <div className="h-screen w-screen bg-blue-400/5 flex justify-center items-center">
      <div className="bg-white w-[450px] px-5 py-5 shadow-xl shadow-blue-600/10 rounded-lg flex flex-col gap-4">
        <div className="flex gap-5 items-center">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="profile pic"
              className="h-[50px] w-[50px] rounded-full"
            />
          ) : (
            <FaUserCircle className="h-[60px] w-[60px]" />
          )}

          <div>
            <p className="text-lg text-blue-600 font-bold">
              {user.displayName}
            </p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <hr className="text-gray-400/40 mt-4" />
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between">
              <p className="text-lg">Name</p>
              {usernameClick ? (
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="text-gray-500 border-b-1 border-gray-400/40 outline-none text-lg text-right"
                />
              ) : (
                <p
                  className="text-gray-500 text-lg"
                  onClick={() => setUsernameClick((prev) => !prev)}
                >
                  {user.displayName}
                </p>
              )}
            </div>

            <hr className="text-gray-400/40 mt-4" />
          </div>
          <div>
            <div className="flex justify-between">
              <p className="text-lg">Email account</p>
              {emailClick ? (
                <input
                  type="text"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  className="text-gray-500 border-b-1 border-gray-400/40 outline-none text-lg text-right"
                />
              ) : (
                <p
                  className="text-gray-500 text-lg"
                  onClick={() => setEmailClick((prev) => !prev)}
                >
                  {user.email}
                </p>
              )}
            </div>

            <hr className="text-gray-400/40 mt-4" />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 h-[40px] px-4 rounded-md text-white hover:scale-105 transition-all"
            onClick={handleUpdateProfile}
          >
            Save changes
          </button>
          <button
            className="bg-blue-500 h-[40px] px-4 rounded-md text-white hover:scale-105 transition-all"
            onClick={handleCancelChanges}
          >
            Cancel changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
