import ReactDOM from "react-dom/client";
import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Provider} from "react-redux";
//import store from "./store";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute, {Isauth} from './PrivateRoute'
import Captioning from "./Captioning";
import ImageUploader from "./ImageUploader";

import "./App.css";
//import {Routes as sexRoutes} from "./Routes_T";
//import AuthProvider from "./AuthProvider_T";
//    <AuthProvider>
//    <sexRoutes/>
//</AuthProvider>

//const UserContext = createContext({
//    user: "",
//    setUser: () => {}
//  });

const UserContext = createContext();
export {UserContext};
export default function App() {
    const [user, setUser] = useState(null);  
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <PrivateRoute>
                <Layout />
                </PrivateRoute>
                }>
                <Route index element={<Home />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NoPage />} />
                </Route>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path='/captioning' element={
                    <PrivateRoute>
                    <Captioning/>
                    </PrivateRoute>
                } />
                <Route path='/ImageUploader' element={
                    <PrivateRoute>
                    <ImageUploader/>
                    </PrivateRoute>
                } />

                //<Route path="/captioning" element={<Captioning/>} />
            </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);