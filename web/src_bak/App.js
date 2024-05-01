// src/App.js
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'; // Import the Login component
//import Sex from './Sex'; // Import the Login component
import PrivateRoute from './PrivateRoute';
//function App() {
//  Login  
//}
//export default App;
//<PrivateRoute path="/captioning/" component={Sex} />
<Router>
  <Route path="/login" component={Login} />
  
</Router>
