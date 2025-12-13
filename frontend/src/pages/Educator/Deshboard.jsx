import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";

function Deshboard() {
  const {userData} = useSelector(state=>state.user)
  const navigate = useNavigate()
  return (
    <div className='flex min-h-screen bg-gray-100'> 
        <div className='w-full px-6 py-10 space-y-10'>
            <div className='max-w-6xl mx-auto'>
                <button onClick={()=>{navigate("/")}} className='mb-8 flex items-center gap-2 text-gray-600 hover:text-black transition-colors'>
                    <FaArrowLeft size={20} />
                    <span className='font-medium'>Back to Home</span>
                </button>

                {/* main section  */}
                <div className='bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden'>
                    <div className='absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full -mr-32 -mt-32 z-0'></div>
                    
                    <div className='relative z-10'>
                        {userData?.photoUrl ? (
                            <img src={userData?.photoUrl} alt="User" className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg' />
                        ) : (
                            <div className='w-32 h-32 rounded-full bg-black text-white flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg'>
                                {userData?.name?.slice(0,1).toUpperCase()}
                            </div>
                        )}
                    </div>
                    
                    <div className='text-center md:text-left space-y-3 relative z-10 flex-1'>
                        <h1 className='text-3xl font-bold text-gray-900'>Welcome back, {userData?.name || "Educator"} 👋</h1>
                        <p className='text-gray-500 max-w-lg'>{userData?.description || "Start creating amazing courses and share your knowledge with the world."}</p>
                        
                        <div className='flex flex-wrap gap-4 justify-center md:justify-start mt-4'>
                            <div className='bg-gray-50 px-6 py-3 rounded-xl border border-gray-100'>
                                <span className='block text-xs font-semibold text-gray-500 uppercase'>Total Earnings</span>
                                <span className='text-2xl font-bold text-gray-900'>$0.00</span>
                            </div>
                            <button onClick={()=>{navigate("/courses")}} className='px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2'>
                                <span>Manage Courses</span>
                            </button>
                        </div>
                    </div>  
                </div>

                {/* Stats Grid */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
                    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                        <h3 className='text-gray-500 font-medium text-sm uppercase'>Total Students</h3>
                        <p className='text-3xl font-bold text-gray-900 mt-2'>0</p>
                    </div>
                    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                        <h3 className='text-gray-500 font-medium text-sm uppercase'>Active Courses</h3>
                        <p className='text-3xl font-bold text-gray-900 mt-2'>0</p>
                    </div>
                    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                        <h3 className='text-gray-500 font-medium text-sm uppercase'>Course Rating</h3>
                        <p className='text-3xl font-bold text-gray-900 mt-2'>0.0</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Deshboard