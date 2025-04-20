import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
  </StrictMode>,
)
