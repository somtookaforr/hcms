import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create context
const DataContext = createContext();
// Create context provider
export const DataProvider = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState(null);
  const [users, setUsers] = useState(null);
  const [profile, setProfile] = useState(null);
  const [assigned, setAssigned] = useState(null);
  const [userComplaints, setUserComplaints] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data
  const fetchComplaints = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setComplaints(response.data);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      localStorage.setItem("userType", response.data.user_type);
      localStorage.setItem("userName", response.data.username);
      setProfile(response.data);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAssigned = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAssigned(response.data);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserComplaints = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserComplaints(response.data);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        userComplaints,
        assigned,
        complaints,
        users,
        profile,
        loading,
        error,
        fetchComplaints,
        fetchUsers,
        fetchProfile,
        fetchAssigned,
        fetchUserComplaints,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to consume context
export const useData = () => {
  return useContext(DataContext);
};
