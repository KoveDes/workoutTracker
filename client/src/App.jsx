import React from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Stats from "./pages/Stats.jsx";
import Body from "./pages/Body.jsx";
import Settings from "./pages/Settings.jsx";
import Exercises from "./pages/Exercises.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Layout from "./components/Layout.jsx";
import BodyPart from "./components/BodyPart.jsx";
import {AuthProvider} from "./context/authProvider.jsx";
import Missing from "./pages/Missing.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import PersistLogin from "./components/PersistLogin.jsx";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<PersistLogin/>}>
                        <Route path='/' element={<Layout/>}>
                            <Route index element={<Home/>}/>
                            <Route path='about' element={<About/>}/>
                            <Route path='login' element={<Login/>}/>
                            <Route path='register' element={<Register/>}/>
                            <Route element={<RequireAuth/>}>
                                <Route path='stats' element={<Stats/>}/>
                                <Route path='body' element={<Body/>}>
                                    <Route index element={<BodyPart/>}/>
                                    <Route path=':bodyPart' element={<BodyPart/>}/>
                                </Route>
                                <Route path='settings' element={<Settings/>}/>
                                <Route path='exercises' element={<Exercises/>}/>
                            </Route>
                        </Route>
                        <Route path='*' element={<Missing/>}/>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
