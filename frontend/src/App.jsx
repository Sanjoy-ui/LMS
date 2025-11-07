import React from 'react'
import Home from './pages/home'

import { Routes , Route } from 'react-router-dom'
import './index.css'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import getCurrentUser from './customHook/getCurrentUser'

export const serverUrl = "http://localhost:8000"

function App() {
  getCurrentUser()
  return (
    <>
      <ToastContainer />
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />
      </Routes>
    </>
  )
}

export default App