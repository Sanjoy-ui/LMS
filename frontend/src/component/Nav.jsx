import React, { useState } from 'react'
// import logo from  "../assets/logo.jpg"
import { IoPersonCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import {toast } from "react-toastify"
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import main_logo from '../assets/main_logo.webp'



function Nav() {
    const {userData} = useSelector(state=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show , setShow]= useState(false)
    const [showHam , setShowHam]= useState(false)
    const handleLogout = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout" , {withCredentials: true})
            dispatch(setUserData(null))
            console.log(result)
            toast.success("Logout Successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
  return (
    <div className='h-[70px]'>
        <div className='w-full h-[70px] fixed top-0 px-6 py-2 flex items-center justify-between bg-[#000047] z-50 shadow-md'>
                <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/')}>
                    <img src={main_logo} alt="Logo" className='w-12 h-12 rounded-md border-2 border-white object-cover' />
                    <span className='text-white font-bold text-xl hidden sm:block'>LMS</span>
                </div>
                
                <div className='hidden lg:flex items-center gap-6'>
                        {userData?.role === "Educator" && (
                            <button 
                                className='px-5 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#000047] transition-all duration-300 font-medium'
                                onClick={()=>{navigate("/deshboard")}}
                            >
                                Dashboard
                            </button>
                        )}
                        
                        {!userData ? (
                            <button 
                                className='px-6 py-2 bg-white text-[#000047] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300'
                                onClick={()=>{navigate("/login")}} 
                            >
                                Login
                            </button>
                        ) : (
                            <div className='relative'>
                                <div className='flex items-center gap-3 cursor-pointer' onClick={()=> setShow(prev => !prev)}>
                                    {userData?.photoUrl ? (
                                        <img className='w-10 h-10 rounded-full border-2 border-white object-cover' src={userData.photoUrl} alt='User' />
                                    ) : (
                                        <div className='w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold border-2 border-white'>
                                            {userData?.name?.slice(0,1).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                
                                {show && (
                                    <div className='absolute top-12 right-0 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 overflow-hidden animate-fade-in'>
                                        <div className='px-4 py-2 border-b border-gray-100'>
                                            <p className='text-sm font-semibold text-gray-800 truncate'>{userData.name}</p>
                                            <p className='text-xs text-gray-500 truncate'>{userData.email}</p>
                                        </div>
                                        <button className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors' onClick={()=>{navigate("/profile"); setShow(false)}}>My Profile</button>
                                        <button className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors' onClick={()=>{navigate("/profile"); setShow(false)}}>My Courses</button>
                                        <button className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors' onClick={() => {handleLogout(); setShow(false)}}>Logout</button>
                                    </div>
                                )}
                            </div>
                        )}
                </div>

                <RxHamburgerMenu className='w-8 h-8 lg:hidden text-white cursor-pointer hover:scale-105 transition-transform' onClick={()=>{ setShowHam(true)}}/>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${showHam ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setShowHam(false)} />

                {/* Mobile Menu Sidebar */}
                <div className={`fixed top-0 right-0 w-[75%] max-w-[300px] h-full bg-[#000047] flex flex-col gap-6 p-6 z-50 lg:hidden transition-transform duration-300 ease-out shadow-2xl ${showHam ? "translate-x-0" : "translate-x-full"}`}>
                    <div className='flex justify-end'>
                        <ImCross onClick={()=>{ setShowHam(false)}} className='w-6 h-6 text-white cursor-pointer hover:rotate-90 transition-transform duration-300'/>
                    </div>
                    
                    <div className='flex flex-col items-center gap-4 mt-4'>
                        {userData ? (
                            <div className='flex flex-col items-center gap-2'>
                                {userData?.photoUrl ? (
                                    <img src={userData.photoUrl} className='w-20 h-20 rounded-full border-4 border-white object-cover' alt="User" />
                                ) : (
                                    <div className='w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold border-4 border-white'>
                                        {userData?.name?.slice(0,1).toUpperCase()}
                                    </div>
                                )}
                                <p className='text-white font-semibold text-lg'>{userData.name}</p>
                            </div>
                        ) : (
                            <IoPersonCircleOutline className='w-20 h-20 text-white/80' />
                        )}
                    </div>

                    <div className='flex flex-col gap-3 w-full mt-4'>
                        <button className='w-full py-3 px-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-left font-medium' onClick={()=>{navigate("/profile"); setShowHam(false)}}>My Profile</button>
                        <button className='w-full py-3 px-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-left font-medium' onClick={()=>{navigate("/profile"); setShowHam(false)}}>My Courses</button>
                        
                        {userData?.role === "Educator" && (
                            <button className='w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-left font-medium' onClick={()=>{navigate("/deshboard"); setShowHam(false)}}>Dashboard</button>
                        )}
                        
                        {!userData ? (
                            <button className='w-full py-3 px-4 bg-white text-[#000047] rounded-lg hover:bg-gray-100 transition-colors font-bold text-center mt-4' onClick={()=>{navigate("/login"); setShowHam(false)}}>Login</button>
                        ) : (
                            <button className='w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-bold text-center mt-4' onClick={() => {handleLogout(); setShowHam(false)}}>Logout</button>
                        )}
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Nav