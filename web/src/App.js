// src/App.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import Login from './Login'; // Import the Login component
function App() {
  const { register, handleSubmit, formState: { errors }} = useForm(); 
  const [loginError, setLoginError] = useState('');
  const onSubmit = (data) => {
    try { 
      // Handle form submission (e.g., send data to the server)
      Login(data);
      console.log(data);
    } catch (error) {
      setLoginError('Invalid credentials. Please try again.');
    }
  };
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

export default App;
