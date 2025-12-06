import React, { useState } from 'react'
import logo from  "../assets/logo.jpg"
import { IoPersonCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import {toast } from "react-toastify"
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCross } from "react-icons/im";



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
    <div>
        <div className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#000047] z-10 '>
                <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
                    <img src={logo} alt="" className='w-[60px] rounded-[5px] border-2 border-white ' />
                </div>
                <div className='w-[30%] lg:flex items-center justify-center gap-4 hidden'>
                        {!userData && <IoPersonCircleOutline onClick={()=> setShow(prev => !prev)} className='w-[50px] h-[50px] fill-white cursor-pointer'/>}
                        {userData?.photoUrl ? <img onClick={()=> setShow(prev => !prev)} className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[28px] border-2 bg-black border-white cursor-pointer' src={userData.photoUrl} alt='User Photo' /> : <div onClick={()=> setShow(prev => !prev)}  className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[28px] border-2 bg-black border-white cursor-pointer' >
                            { userData?.name.slice(0,1).toUpperCase()
                            }

                        </div>}
                        {userData?.role=== "Educator" && <div className='px-[20px] py-[10px] border-2 lg:border-white border-white lg:text-white rounded-[10px] text-[18px] font-light  cursor-pointer ' onClick={()=>{navigate("/deshboard")}}>Deshboard</div> }
                        {!userData ? <span className='px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]' onClick={()=>{navigate("/login")}} >Login</span> :
                        <span className='px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]' onClick={handleLogout} >Logout</span> }
                        {show && <div className='absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-gray-400 px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-cursor-pointer hover:bg-white '>
                                <span className='bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 ' onClick={()=>{navigate("/profile")}} >My Profile</span>
                                <span className='bg-[black] text-white px-[26px] py-[10px] rounded-2xl hover:bg-gray-600 '>My courses</span>
                        </div>}

                        

                </div>
                <RxHamburgerMenu className='w-[35px] h-[35px] lg:hidden text-[white] fill-white cursor-pointer' onClick={()=>{ setShowHam(prev => !prev)}}/>

                <div className={`fixed top-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden left-0 transition-all duration-500 ease-in-out ${showHam ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}>
                            <ImCross onClick={()=>{ setShowHam(prev => !prev)}} className='w-[30px] h-[30px] text-white absolute top-5 right-[4%] cursor-pointer hover:scale-110 transition-transform'/>
                                {!userData && <IoPersonCircleOutline  className='w-[50px] h-[50px] fill-white cursor-pointer'/>}
                        {userData?.photoUrl ? <img src={userData.photoUrl} className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[28px] border-2 bg-black border-white cursor-pointer' alt="User Photo" /> : <div   className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[28px] border-2 bg-black border-white cursor-pointer' >
                            {userData?.name.slice(0,1).toUpperCase()}

                        </div>}

                            <div className='w-[200px] h-[50px] border-2 lg:border-white border-white lg:text-white rounded-[10px] text-[18px] bg-black text-white flex items-center justify-center font-light  cursor-pointer ' onClick={()=>{navigate("/profile")}}>My Profile</div>
                            <div className='w-[200px] h-[50px] border-2 lg:border-white border-white lg:text-white rounded-[10px] text-[18px] bg-black text-white flex items-center justify-center font-light  cursor-pointer '>My Courses</div>

                        {userData?.role=== "Educator" && <div className='w-[200px] h-[50px] border-2 lg:border-white border-white flex items-center justify-center bg-black text-white lg:text-white rounded-[10px] text-[18px] font-light  cursor-pointer ' onClick={()=>{navigate("/deshboard")}} >Deshboard</div> }

                        {!userData ? <span className='w-[200px] h-[50px] border-2 lg:border-white border-white lg:text-white rounded-[10px] text-[18px] bg-black text-white flex items-center justify-center font-light  cursor-pointer ' onClick={()=>{navigate("/login")}} >Login</span> :
                        <span className='w-[200px] h-[50px] border-2 lg:border-white border-white lg:text-white rounded-[10px] text-[18px] bg-black text-white flex items-center justify-center font-light  cursor-pointer ' onClick={handleLogout} >Logout</span> }
                </div>
        </div>
    </div>
  )
}

export default Nav