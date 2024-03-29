import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../App";
import { BsBuildings } from "react-icons/bs";

const Register = () => {
  const [formData, setFormData] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      const response = await axios.post(endpoint + "register/", formData);
      toast.dismiss();
      toast.success("Account created successfully, Please proceed to login!", {
        toastId: customId,
      });
      //   navigate('/Index', { replace: true })
    } catch (error) {
      toast.dismiss();
      console.error("There was a problem with the request:", error.message);
      toast.error("Something went wrong, Please retry", {
        toastId: customId,
      });
    }
  };

  return (
    <div className="grid bg-blue-950">
      <ToastContainer autoClose={8000} />
      <div className={"text-white h-12 flex justify-self-center mt-16"}>
        <BsBuildings size={50} />
        <p className="self-center font-bold text-3xl">HCMS</p>
      </div>
      <p className="text-white text-center text-xl mt-4">
        Hostel Complaints Management System
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-11/12 lg:w-1/3 grid gap-y-4 p-10 rounded border border-blue-400 justify-self-center my-20"
      >
        <div className="">
          <label htmlFor="name" className="text-white">
            First Name
          </label>{" "}
          <br />
          <input
            type="text"
            className="rounded h-11 w-full mt-1 p-2 border border-blue-400"
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="name">
          <label htmlFor="" className="text-white">
            Last Name
          </label>{" "}
          <br />
          <input
            type="text"
            className="rounded h-11 w-full mt-1 p-2 border border-blue-400"
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="email">
          <label htmlFor="" className="text-white">
            Email
          </label>{" "}
          <br />
          <input
            type="email"
            className="rounded h-11 w-full mt-1 p-2 border border-blue-400"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="name">
          <label htmlFor="" className="text-white">
            User Name
          </label>{" "}
          <br />
          <input
            type="text"
            className="rounded h-11 w-full mt-1 p-2 border border-blue-400"
            name="username"
            placeholder="User Name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="number">
          <label htmlFor="" className="text-white">
            Phone Number
          </label>{" "}
          <br />
          <input
            type="text"
            className="rounded h-11 w-full mt-1 p-2 border border-blue-400"
            name="phone_number"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
        </div>

        <div className="user">
          <label htmlFor="" className="text-white">
            User Type
          </label>{" "}
          <br />
          <select
            name="user_type"
            id=""
            className="rounded h-11 w-full mt-1 p-2 border border-blue-400"
            onChange={handleChange}
            required
          >
            <option value="">-Select-</option>
            <option value={1}>Admin</option>
            <option value={2}>Staff</option>
            <option value={3}>Student</option>
          </select>
          {/* <input type="text" className='rounded h-11 w-full mt-1 p-2 border border-blue-400' name='user_type' value={formData.user_type} placeholder='' onChange={handleChange} required />     */}
        </div>

        {formData.user_type == "2" ? (
          <>
            <div className="number">
              <label htmlFor="" className="text-white">
                Role
              </label>{" "}
              <br />
              <input
                type="text"
                className="rounded h-11 w-full mt-1 p-2 border border-blue-400"
                name="role"
                placeholder="Role"
                onChange={handleChange}
                required
              />
            </div>
          </>
        ) : formData.user_type == "3" ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="" className="text-white">
                  Matric Number
                </label>{" "}
                <br />
                <input
                  type="text"
                  className="rounded h-11 w-full mt-1 p-2 border border-blue-400"
                  name="matric_no"
                  placeholder="Matric Number"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="" className="text-white">
                  Department
                </label>{" "}
                <br />
                <select
                  name="department"
                  id=""
                  className="rounded h-11 w-full mt-1 p-2 border border-blue-400"
                  onChange={handleChange}
                  required
                >
                  <option value="">-Select-</option>
                  <option value="1">Software Engineering</option>
                  <option value="2">Computer Science</option>
                </select>
              </div>

              <div>
                <label htmlFor="" className="text-white">
                  Hostel
                </label>{" "}
                <br />
                <select
                  name="hostel"
                  id=""
                  className="rounded h-11 w-full mt-1 p-2 border border-blue-400"
                  onChange={handleChange}
                  required
                >
                  <option value="">-Select-</option>
                  <option value="101">Bethel Splendor</option>
                  <option value="102">Welch</option>
                  <option value="103">Samuel Akande</option>
                  <option value="104">Winslow</option>
                </select>
              </div>

              <div>
                <label htmlFor="" className="text-white">
                  Room Number
                </label>{" "}
                <br />
                <input
                  type="text"
                  className="rounded h-11 w-full mt-1 p-2 border border-blue-400"
                  name="room_number"
                  placeholder="Room Number"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="password">
          <label htmlFor="password" className="text-white">
            Password
          </label>{" "}
          <br />
          <input
            minLength={8}
            type="password"
            className="rounded h-11 w-full mt-1 p-2 border border-blue-400"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>

        <div className="password">
          <label htmlFor="password" className="text-white">
            Confirm Password
          </label>{" "}
          <br />
          <input
            minLength={8}
            type="password"
            className="rounded h-11 w-full mt-1 p-2 border border-blue-400"
            name="password2"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
        </div>

        <p className="text-white text-right">
          Already have an account yet?{" "}
          <a href="/" className="text-blue-600 underline">
            Login
          </a>
        </p>

        <button
          className="w-full bg-blue-600 h-12 rounded text-white mt-8"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
