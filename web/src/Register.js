// register.js
//import React, { useState } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
//import "./App.css";

async function registerUser(credentials) {
  // Make a POST request to your server with credentials
  // Server validates credentials and returns a JWT
  // Example: const token = await fetch("/api/login", { method: "POST", body: credentials });
  
  //credentials = {'username': 'sexsex', 'password':'sexsex'};
  //console.log(JSON.stringify(credentials));
  //console.log(credentials);
  //console.log(JSON.parse(JSON.stringify(credentials)));
  const token = await fetch("/api/user/register/", { 
            method: "POST",   
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(credentials) }
            );
  return token; // Replace with actual response
}

export default function Register() {
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [response, setResponse] = useState();
  const [status, setStatus] = useState();
  const [loginError, setLoginError] = useState('');
  const onSubmit = (data) => {
    try { 
      registerUser(data).then ((token) => 
          {console.log (token); 
          //console.log (token.ok); 
          setStatus(token.ok); 
          return token.json();
          }
          ).then ((message) => {console.log(message); setResponse(message['message']);});
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
    <p className="title">Register Form</p>
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Username" name = 'username' {...register('username', { required: true })}  />
      {errors.username && <p className="error"> Username is required</p>}
     
      <input id="email" placeholder="example@email.com"
        {...register("email", {
          required: "required",
          pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                    },})
        }
        type="email"
      />
      {errors.email && <span role="alert">{errors.email.message}</span>}

      <input type="password" placeholder="Password" 
      name="password" {...register('password', { required: true, minLength: 6 })}
        />
      {errors.password && (
        <p className="error">Password must be at least 6 characters</p>
      )}
      
      <input type="rePassword" placeholder="rePassword" 
      name="rePassword" {...register('rePassword', { required: true, minLength: 6 })}
        />
      {errors.rePassword && (
        <p className="error">rePassword must be at least 6 characters</p>
      )}
      
      <button type="submit" style={{ backgroundColor: "#a1ffa1" }}>
          Register
      </button>
      <p> {response} </p>
    </form>
  </>
  );

}
