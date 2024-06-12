//https://stackoverflow.com/questions/49473727/how-to-handle-multiple-routers-in-react
import React, { useEffect, useState} from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { createContext, useContext } from "react";
import {UserContext} from "../index.js";

function Isauth () {
    const {user, setUser} = useContext(UserContext);
    if (user) 
    {
      console.log ("Private route: user logged in");
      console.log (user); return true;
    }
    else return false;
};
const PrivateRoute = ({ children }) => {
    let location = useLocation();
    const authed = Isauth(); // isauth() returns true or false based on localStorage
    return authed ? children : <Navigate to="/Login" state={{ from: location }}/>;
  }
export default PrivateRoute;
//export default isauth;
export {Isauth};