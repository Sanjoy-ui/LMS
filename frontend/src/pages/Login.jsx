import React from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import { FaRegEye } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';

function Login() {
  const [show , setShow ]= useState(false)
  const [email , setEmail]= useState("")
  const [password , setPassword]= useState("")
  const navigate = useNavigate()
  const [loading , setLoading ] = useState(false)
  const dispatch = useDispatch()
  let role = ""

  const handlLogin = async () => {
    setLoading(true)
      try {
        
        const loginResult = await axios.post(serverUrl + "/api/auth/login" , {email , password} , {withCredentials : true})
        dispatch(setUserData(loginResult.data))
        setLoading(false)
        toast.success("Login Successfully ")
        navigate("/")
      } catch (error) {
        setLoading(false)
        console.log("login error")
        toast.error(error.response.data.message)
      }
  }
  
        const googleLogin = async () => {
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
            toast.success("Login with Google Successfully!")
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error?.response?.data?.message || "Google Login  Failed")
        }
    }

    return (
      <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center gap-3'>
          <form onSubmit={(e)=>{e.preventDefault()}} className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex'>
              {/* left div */}
              <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
                  <div>
                      <h1 className='font-semibold text-[black] text-2xl'>Welcome back </h1>
                  <h2 className='text-[#999797] text-[18px] '>Login in Your Account</h2>
                  </div>
                  
                  <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                          <label htmlFor="email" className='font-semibold'>Email</label>
                          <input id='email' type="email" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] rounded-2xl px-[20px] ' placeholder = "Your Email" onChange={(e)=>{
                            setEmail(e.target.value)
                          }} value={email} />
                  </div>
                  <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
                          <label htmlFor="password" className='font-semibold'>Password</label>
                          <input id='password' type= {show ? "text" : 'password' } className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] rounded-2xl px-[20px] ' placeholder = "Password" onChange={(e)=>{
                            setPassword(e.target.value)
                          }} value={password} />
                          { show ? <FaRegEye className=' absolute w-[20px] h-[20px] cursor-pointer right-[5%] buttom-[10%]' onClick={()=>{
                              setShow(prev => !prev)
                          }}/> : <IoMdEye className=' absolute w-[20px] h-[20px] cursor-pointer right-[5%] buttom-[10%]' onClick={()=>{
                              setShow(prev => !prev)
                          }} />}
  
  
                  </div>
                  
                  <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]' disabled={loading} onClick={handlLogin} >{ loading ? <ClipLoader size={30} color = "white" />: "Login"}</button>
                  <span className='underline underline-offset-1 text-[13px] text-[#585757] cursor-pointer' onClick={()=>{
                    navigate("/forget")
                  }}>Forget your Password ?</span>
                  <div className='w-[80%] flex items-center gap-2'>
                          <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]  '></div>
                          <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or Continue</div>
                          <div className='w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>
                  </div>
                  <div className='w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center cursor-pointer' onClick={googleLogin}>
                      <img src={google} className='w-[25px]' alt="google" />
                      <span className='text-[18px] text-gray-500'>oogle</span>
                  </div>
                  <div className='text-[#6f6f6f] '>
                         Create an account ? <span className='cursor-pointer underline underline-offset-1 text-[black] ' onClick={()=>{
                            navigate("/signup")
                        }}>Sign up</span>
                </div>
              </div>
              {/* right div */}
              <div className='w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden'>
                  <img src={logo} alt="Logo" className='w-30 shadow-2xl' />
                  <span className='text-2xl text-white'>Virtual LMS</span>
              </div>
          </form>
      </div> )
}

export default Login