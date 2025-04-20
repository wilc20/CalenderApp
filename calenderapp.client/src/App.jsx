//import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Forecast from './components/Pages/Forecast';
import Calender from './components/Pages/Calender';
import Register from './components/Pages/Register';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Calender />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/register" element={<Register />}/>
        </Routes>
    )
}

export default App;