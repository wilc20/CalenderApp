import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Forecast from './components/Pages/Forecast';
import Calender from './components/Pages/Calender';
import Register from './components/Pages/Register';
import Login from './components/Pages/Login';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {

    return (
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Calender />} />
                    <Route path="/forecast" element={<Forecast />} />
                </Route>
            </Routes>
    )
}

export default App;