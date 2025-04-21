import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Forecast from './components/Pages/Forecast';
import Calender from './components/Pages/Calendar';
import CalendarEntry from './components/Pages/CalendarEntry';
import Register from './components/Pages/Register';
import Login from './components/Pages/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import NavLayout from './components/Layouts/NavLayout';
import { CalendarProvider } from './context/CalendarProvider';

function App() {

    return (
        <Routes>
            <Route element={<NavLayout />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route element={<CalendarProvider><ProtectedRoutes /></CalendarProvider>}>
                    <Route index path="/" element={<Calender />} />
                    <Route path="/edit/:id" element={<CalendarEntry /> } />
                    <Route path="/forecast" element={<Forecast />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App;