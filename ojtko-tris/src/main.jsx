import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './sites/Home.jsx'
import Login from './sites/Login.jsx'
import Register from './sites/Register.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
      </Routes>
    </Router>
  </StrictMode>,
)
