import React from 'react'
import main_logo from '../assets/main_logo.webp'

import google from '../assets/google.jpg'
import { FaRegEye } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import {toast } from "react-toastify"
import {ClipLoader} from "react-spinners"
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import {auth ,  provider } from '../../utils/firebase';



function SignUp() {

    const [show , setShow ]= useState(false)
    const navigate = useNavigate()
    const [name , setName]= useState("")
    const [email , setEmail]= useState("")
    const [password , setPassword]= useState("")
    const [role , setRole]= useState("Student")
    const [loading , setLoading ] = useState(false)
    const dispatch = useDispatch()

    const handleSignUp = async () => {
        setLoading(true)
        try {
            const result =await  axios.post(serverUrl + "/api/auth/signup" , {
                 name,
                 password,
                 email,
                 role
            }, {withCredentials: true})
            dispatch(setUserData(result.data))
            setLoading(false)
            navigate("/")
            toast.success("Signed Up Successfully :)")
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error("Sign Up Failed")
        }
    }   

    const googleSignUp = async () => {
        setLoading(true)
        try {
            const response = await signInWithPopup(auth , provider)
            const user = response.user
            
            // Send user data to backend
            const result = await axios.post(serverUrl + "/api/auth/google-signup", {
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
                role: role
            }, { withCredentials: true })
            
            dispatch(setUserData(result.data))
            setLoading(false)
            navigate("/")
            toast.success("Signed Up with Google Successfully!")
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error?.response?.data?.message || "Google Sign Up Failed")
        }
    }

  return (
    <div className='bg-gray-100 min-h-screen w-full flex items-center justify-center p-4'>
        <form className='w-full max-w-4xl bg-white shadow-2xl rounded-2xl flex overflow-hidden min-h-[600px]' onSubmit={(e)=>{
            e.preventDefault()
        }}>
            {/* left div */}
            <div className='w-full md:w-1/2 flex flex-col items-center justify-center gap-6 p-8'>
                <div className='text-center'>
                    <h1 className='font-bold text-gray-900 text-3xl mb-2'>Let's Get Started</h1>
                    <h2 className='text-gray-500 text-lg'>Create Your Account</h2>
                </div>
                
                <div className='flex flex-col gap-2 w-full max-w-xs'>
                        <label htmlFor="name" className='font-semibold text-gray-700 text-sm'>Name</label>
                        <input id='name' type="text" className='w-full h-10 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all' placeholder = "Your Name" onChange={(e)=>{
                            setName(e.target.value) 
                        }} value={name} />
                </div>
                <div className='flex flex-col gap-2 w-full max-w-xs'>
                        <label htmlFor="email" className='font-semibold text-gray-700 text-sm'>Email</label>
                        <input id='email' type="email" className='w-full h-10 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all' placeholder = "Your Email" onChange={(e)=>{
                            setEmail(e.target.value)
                        }} value={email} />
                </div>
                <div className='flex flex-col gap-2 w-full max-w-xs relative'>
                        <label htmlFor="password" className='font-semibold text-gray-700 text-sm'>Password</label>
                        <div className='relative w-full'>
                            <input id='password' type= {show ? "text" : 'password' } className='w-full h-10 border border-gray-300 rounded-lg px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all' placeholder = "Password" onChange={(e)=>{
                                setPassword(e.target.value)
                            }} value={password} />
                            <div className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer'>
                                { show ? <FaRegEye size={20} onClick={()=>setShow(prev => !prev)}/> : <IoMdEye size={20} onClick={()=>setShow(prev => !prev)} />}
                            </div>
                        </div>
                </div>
                
                <div className='flex w-full max-w-xs items-center justify-center gap-4'>
                        <span className={`px-4 py-2 border-2 rounded-xl cursor-pointer transition-all font-medium text-sm ${role === "Student" ? "border-black bg-black text-white" : "border-gray-200 text-gray-500 hover:border-gray-400"}` } onClick={()=>{
                            setRole("Student")
                        }}>Student</span>
                        <span className={`px-4 py-2 border-2 rounded-xl cursor-pointer transition-all font-medium text-sm ${role === "Educator" ? "border-black bg-black text-white" : "border-gray-200 text-gray-500 hover:border-gray-400"}`} onClick={()=>{
                            setRole("Educator")
                        }}>Educator</span>
                </div>

                <button className='w-full max-w-xs h-10 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center' disabled= {loading} onClick={handleSignUp}>{loading ? <ClipLoader size={20} color = "white" /> : "Sign Up"}</button>
                
                <div className='flex items-center gap-2 w-full max-w-xs'>
                        <div className='h-[1px] bg-gray-300 flex-1'></div>
                        <span className='text-xs text-gray-400'>OR</span>
                        <div className='h-[1px] bg-gray-300 flex-1'></div>
                </div>

                <button 
                    type="button"
                    className='w-full max-w-xs h-10 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed' 
                    onClick={googleSignUp}
                    disabled={loading}
                >
                    <img src={google} className='w-5 h-5 pointer-events-none' alt="Google" />
                    <span className='text-sm font-medium text-gray-700 pointer-events-none'>Sign up with Google</span>
                </button>

                <p className='text-sm text-gray-600'>
                        Already have an account? <span className='font-bold text-black cursor-pointer hover:underline' onClick={()=>{navigate("/login")}}>Login</span>
                </p>
            </div>
            {/* right div */}
            <div className='hidden md:flex w-1/2 bg-black items-center justify-center p-12 relative overflow-hidden'>
                <div className='absolute inset-0 opacity-20'>
                    <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black'></div>
                </div>
                <div className='relative z-10 text-center text-white space-y-6'>
                    <img src={main_logo} className='w-32 h-32 rounded-2xl mx-auto mb-6 border-4 border-white/20 shadow-2xl' alt="Logo" />
                    <h2 className='text-3xl font-bold'>Join our community</h2>
                    <p className='text-gray-400 max-w-sm mx-auto'>Create an account to start learning, teaching, and growing with us.</p>
                </div>
            </div>
        </form>
    </div>
  )
}

export default SignUp