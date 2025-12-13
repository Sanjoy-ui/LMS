import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";


function Profile() {
  const {userData } = useSelector(state=>state.user)
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
        <div className='bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full relative overflow-hidden'>
          <div className='absolute top-0 left-0 w-full h-32 bg-black'></div>
          <button onClick={()=>navigate("/")} className='absolute top-6 left-6 text-white hover:text-gray-300 transition-colors z-10 flex items-center gap-2'>
            <FaArrowLeft size={20} />
            <span className='font-medium'>Back</span>
          </button>
          
          <div className='relative flex flex-col items-center text-center mt-12'>
            <div className='relative'>
              {userData?.photoUrl ? (
                <img src={userData?.photoUrl} className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg bg-white' alt={userData?.name} />
              ) : (
                <div className='w-32 h-32 rounded-full text-white flex items-center justify-center text-4xl border-4 border-white bg-black shadow-lg'>  
                  {userData?.name?.slice(0,1).toUpperCase()}
                </div>
              )}
              <span className='absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full'></span>
            </div>
            
            <h2 className='text-3xl font-bold mt-4 text-gray-900'>
              {userData?.name}
            </h2>
            <span className='px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium mt-2'>
              {userData?.role}
            </span>
          </div>

          <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-gray-50 p-4 rounded-xl'>
                <span className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>Email Address</span>
                <span className='text-gray-900 font-medium break-all'>{userData?.email}</span>
              </div>
              
              <div className='bg-gray-50 p-4 rounded-xl'>
                <span className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>Total Courses Created</span>
                <span className='text-gray-900 font-medium'>{userData?.enrollCourses?.length || 0} Courses</span>
              </div>

              <div className='bg-gray-50 p-4 rounded-xl md:col-span-2'>
                <span className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>Bio</span>
                <p className='text-gray-900'>{userData?.description || "No bio added yet."}</p>
              </div>
          </div>

          <div className='mt-8 flex justify-center'>
            <button 
              className='px-8 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 active:scale-95 transition-all shadow-lg hover:shadow-xl' 
              onClick={()=>navigate("/editprofile")}
            >
              Edit Profile
            </button>
          </div>
        </div>
    </div>
  )
}

export default Profile