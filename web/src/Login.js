// Login.js
//import React, { useState } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  // Make a POST request to your server with credentials
  // Server validates credentials and returns a JWT
  // Example: const token = await fetch("/api/login", { method: "POST", body: credentials });
  const token = await fetch("/login", { method: "POST", body: credentials });
  return { token }; // Replace with actual response
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({ username, password });
    setToken(token); // Save the token
  };

  // Render your login form here
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
