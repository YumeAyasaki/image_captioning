// Login.js
//import React, { useState } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
//import "./App.css";

async function loginUser(credentials) {
  // Make a POST request to your server with credentials
  // Server validates credentials and returns a JWT
  // Example: const token = await fetch("/api/login", { method: "POST", body: credentials });
  
  //credentials = {'username': 'sexsex', 'password':'sexsex'};
  //console.log(JSON.stringify(credentials));
  //console.log(credentials);
  //console.log(JSON.parse(JSON.stringify(credentials)));
  const token = await fetch("/api/user/login/", { 
            method: "POST",   
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(credentials) }
            );
  //console.log("Token:", token);
  //const nigger = await token.json();
  //console.log("nigger:", nigger);
  return {token}; // Replace with actual response
}

export default function Login({ setToken }) {
  const { register, handleSubmit, formState: { errors }} = useForm(); 
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState('');
  const onSubmit = (data) => {
    try { 
      loginUser(data).then ((token) => {console.log (token ['token']); return token ['token'].json();}).then ((message) => {console.log(message);});
    } catch (error) {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  //const handleSubmit = async (e) => {
  //  e.preventDefault();
  //  const token = await loginUser({ username, password });
  //  setToken(token); // Save the token
  //};

  // Render your login form here
  return (
    <>
    <p className="title">Login Form</p>
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Username" name = 'username' {...register('username', { required: true })}  />
      {errors.username && <p className="error"> Username is required</p>}

      <input type="password" placeholder="Password" 
      name="password" {...register('password', { required: true, minLength: 6 })}
        />
      {errors.password && (
        <p className="error">Password must be at least 6 characters</p>
      )}
      <button type="submit" style={{ backgroundColor: "#a1ffa1" }}>
        Log In
      </button>
    </form>
  </>
  );

}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};