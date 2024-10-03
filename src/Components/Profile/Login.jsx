import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../Firebaseconfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../Context/UserAuthContext";
import GoogleButton from "react-google-button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/profile");
      toast.success("User logged in Successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-10">
      <h1 className="text-3xl font-bold">Welcome To Mystelith Dashboard</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-[500px] border border-black p-4 rounded-lg"
      >
        <h3 className="text-center uppercase font-bold text-2xl">Login</h3>

        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-center w-full">
          <button type="submit" className="button-fill !w-full">
            Submit
          </button>
        </div>
      </form>

      <div className="border border-gray-400 p-5 rounded-lg w-[500px]">
        <p className="text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500">
            Register Here
          </a>
        </p>
      </div>

      <div className="flex justify-center items-center w-[500px]">
        <h2 className="title text-center ">Or</h2>
      </div>

      <div className="border border-gray-400 p-5 rounded-lg w-[500px] flex justify-center">
        <GoogleButton
          className="button-outline !w-full"
          onClick={handleGoogleSignIn}
        />
      </div>
    </main>
  );
};

export default Login;
