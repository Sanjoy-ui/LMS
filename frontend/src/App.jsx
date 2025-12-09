import React from 'react'
import Home from './pages/home'

import { Routes , Route, Navigate } from 'react-router-dom'
import './index.css'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import getCurrentUser from './customHook/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword'
import EditProfile from './pages/EditProfile'
import Courses from './pages/Educator/Courses.jsx'
import Deshboard from './pages/Educator/Deshboard.jsx'
import CreateCourses from './pages/Educator/CreateCourses.jsx'
import getCreatorCourse from './customHook/getCreatorCourse.js'
import EditCourse from './pages/Educator/EditCourse.jsx'

export const serverUrl = "http://localhost:8000"

function App() {
  getCurrentUser()
  getCreatorCourse()
  const { userData } = useSelector(state => state.user)
  return (
    <>
      <ToastContainer />
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={ !userData ? <SignUp/> : <Navigate  to={"/"}/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/profile' element={userData ? <Profile/>: <Navigate to={"/signup"}/>} />
          <Route path='/forget' element={userData ? <ForgetPassword/> : <Navigate to={"/signup"} /> } />
          <Route path='/editprofile' element={userData ? <EditProfile/> : <Navigate to={"/signup"} /> } />
          <Route path='/deshboard' element={userData?.role === "Educator" ? <Deshboard/> : <Navigate to={"/signup"} /> } />
          <Route path='/courses' element={userData?.role === "Educator" ? <Courses/> : <Navigate to={"/signup"} /> } />
          <Route path='/createcourse' element={userData?.role === "Educator" ? <CreateCourses/> : <Navigate to={"/signup"} /> } />
          <Route path='/editcourse/:courseId' element={userData?.role === "Educator" ? <EditCourse/> : <Navigate to={"/signup"} /> } />
      </Routes>
    </>
  )
}

export default App