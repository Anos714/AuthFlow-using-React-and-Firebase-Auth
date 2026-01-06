import React from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/Context";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { userLogin, handleGoogleLogin, setLoading, user } = useAuth();

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await userLogin(data);
      console.log(result);
      if (!result?.user) {
        toast.error("Something wrong occurred");
        reset();
      } else {
        toast.success("Login Successful");
        reset();
        setLoading(false);
        navigate("/profile");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("Invalid credentials. Please try again.");
          break;
        case "auth/wrong-password":
          toast.error("Invalid credentials. Please try again.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid credentials. Please try again.");
          break;
        case "auth/invalid-credential":
          toast.error("Invalid credentials. Please try again.");
          break;
        default:
          toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (user) return <Navigate to="/profile" />;

  return (
    <div className="h-screen w-screen bg-blue-500/10 flex justify-center items-center">
      <div className="w-[380px] bg-white px-5 py-5 flex flex-col gap-5 rounded-xl shadow-blue-500/10 shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <p className="text-4xl text-blue-700 font-bold">Login</p>
          <p className="w-[90%] text-center">
            Enter your credential to access your account
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div
            className="flex gap-2 items-center justify-center bg-gray-500 text-white py-2 hover:scale-105 transition-all cursor-pointer"
            onClick={handleGoogleLogin}
          >
            Login with Google <FaGoogle />
          </div>
          <p className="text-center text-gray-500">or</p>
          <hr className="text-gray-400/30" />
        </div>
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="border-b-1 border-gray-300 px-1 outline-none"
              {...register("email", { required: true })}
            />
            {errors.email && errors.email.type === "required" ? (
              <p className="text-red-500 text-sm">Email is required</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="border-b-1 border-gray-300 px-1 outline-none"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && errors.password.type === "required" ? (
              <p className="text-red-500 text-sm">Password is required</p>
            ) : null}
            {errors.password && errors.password.type === "minLength" ? (
              <p className="text-red-500 text-sm">
                Password should be atleast 8 characters long
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            className="h-[40px] bg-blue-500 text-white font-semibold hover:scale-105 transition-all cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Don't have an account{" "}
          <span
            className="text-blue-800 underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Regsiter here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
