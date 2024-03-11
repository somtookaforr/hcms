import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../App";
import { BsBuildings } from "react-icons/bs";

const Login = () => {
  const userInput = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(userInput);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const customId = 99999;

    try {
      toast.loading("Loading...", { autoClose: false });
      const response = await axios.post(endpoint + "token/", formData);
      toast.dismiss();
      toast.success("Success!", {
        toastId: customId,
      });
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      navigate("./Index");
    } catch (error) {
      toast.dismiss();
      console.error("There was a problem with the request:", error.message);
      toast.error(error.message, {
        toastId: customId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid bg-blue-950 h-screen">
      <ToastContainer autoClose={4000} />
      <div className={"text-white h-12 grid"}>
        <div className="flex justify-self-center">
          <BsBuildings size={50} />
          <p className="self-center font-bold text-3xl">HCMS</p>
        </div>
        <p className="text-white text-center text-xl mt-4">
          Hostel Complaints Management System
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="lg:w-1/3 grid gap-y-4 p-10 rounded border border-blue-400 justify-self-center h-max"
      >
        <div className="">
          <label htmlFor="" className="text-white">
            Email
          </label>{" "}
          <br />
          <input
            type="email"
            className="rounded h-11 w-full mt-1 p-2 border border-blue-400"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>

        <div className="">
          <label htmlFor="password" className="text-white">
            Password
          </label>{" "}
          <br />
          <input
            type="password"
            className="rounded h-11 w-full mt-1 p-2 border border-blue-400"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <p className="text-white text-right">
          Don't have an account yet?{" "}
          <a href="/register" className="text-blue-600 underline">
            Register
          </a>
        </p>

        <button
          className="w-full bg-blue-600 h-12 rounded text-white mt-8"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
