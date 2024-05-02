//https://stackoverflow.com/questions/49473727/how-to-handle-multiple-routers-in-react
import React, { useEffect, useState} from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { createContext, useContext } from "react";
import {UserContext} from "./index.js";

function Isauth () {
    const {user, setUser} = useContext(UserContext);
    console.log ("User: ");
    console.log (user);
    if (user) return true; else return false;
  //return true;
  //const auth = useSelector(state => state.auth); //If modified, will call useEffect function below;
  //const [isAuthenticated, setIsAuthenticated] = useState(null);
  //useEffect(() => {
    let token = localStorage.getItem('token');
        if(token){
            //let tokenExpiration = jwtDecode(token).exp;
            let dateNow = new Date();
            //if(tokenExpiration < dateNow.getTime()/1000){
            //    setIsAuthenticated(false)
            //}else{
                //setIsAuthenticated(true)
                return true;
            //}
        } else {
           //setIsAuthenticated(false)
           return false;
        }
    // eslint-disable-next-line
  //}, [auth])
  //if(isAuthenticated === null){
  //  return (false);
  //};
  //return (  isAuthenticated   );
};
const PrivateRoute = ({ children }) => {
    let location = useLocation();
    const authed = Isauth(); // isauth() returns true or false based on localStorage
    return authed ? children : <Navigate to="/Login" state={{ from: location }}/>;
  }
export default PrivateRoute;
//export default isauth;
export {Isauth};