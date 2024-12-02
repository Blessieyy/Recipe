import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ email, password });
      console.log("Response:", response)
      if (response && response.data) {
        alert(`Registration successful for ${response.data.email}`);
        navigate("/login"); 
      } else {
        alert("Unexpected response from the server.");
      }
    } catch (error) {
      console.error(error?.response?.data?.error || "Error occurred");
      alert(error?.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
