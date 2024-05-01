/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

*/
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
