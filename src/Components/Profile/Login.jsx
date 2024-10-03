import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from '../../../Firebaseconfig';
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/profile";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };
  
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-10">
      <form onSubmit={handleSubmit} className="space-y-4 w-[300px] border border-black p-4 rounded-lg">
        <h3 className="text-center uppercase font-bold text-2xl">Login</h3>

        <div className="flex flex-col gap-2">
          <h3>Email</h3>
          <input
            type="email"
            className="form-controll"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3>Password</h3>
          <input
            type="password"
            className="form-controll"
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

      <div className="border border-gray-400 p-5 rounded-lg">
        <p className="text-right">
            Don't have an account? <a href="/register" className="text-blue-500">Register Here</a>
        </p>
      </div>
    </main>
  )
}

export default Login
