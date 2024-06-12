// register.js
//import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Navigation from '.././components/Navigation';
//import "./App.css";

async function registerUser(credentials) {
  // Make a POST request to your server with credentials
  // Server validates credentials and returns a JWT
  // Example: const token = await fetch("/api/login", { method: "POST", body: credentials });
  
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
  const navigate = useNavigate();
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
          ).then ((message) => {
                    console.log(message); 
                    setResponse(message['message']); 
                    setTimeout(function() {navigate("/");}, 3000);
                });
    } catch (error) {
      setLoginError('Thông tin không phù hợp');
    }
  };


  // Render your login form here
  return (
    <>
      <Navigation />
    <p className="title"> Biểu mẫu đăng ký </p>
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Tài khoản" name = 'username' {...register('username', { required: true })}  />
      {errors.username && <p className="error"> Username is required</p>}
     
      <input id="email" placeholder="example@email.com"
        {...register("email", {
          required: "required",
          pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email nhập vào không đúng định dạng email",
                    },})
        }
        type="email"
      />
      {errors.email && <span role="alert">{errors.email.message}</span>}

      <input type="password" placeholder="Mật khẩu" 
      name="password" {...register('password', { required: true, minLength: 8 })}
        />
      {errors.password && (
        <p className="error"> Độ dài tối thiểu mật khẩu 8 ký tự </p>
      )}
      
      <input type="password" placeholder="Nhập lại mật khẩu" 
      name="rePassword" {...register('rePassword', { required: true, minLength: 8 })}
        />
      {errors.rePassword && (
        <p className="error"> Độ dài tối thiểu của mật khẩu nhập lại 8 ký tự và phải trùng với mật khẩu </p>
      )}
      
      <button type="submit" style={{ backgroundColor: "#a1ffa1", "min-height": "4vh" }}>
          Đăng Ký
      </button>
      <p> {response} </p>
    </form>
  </>
  );

}
