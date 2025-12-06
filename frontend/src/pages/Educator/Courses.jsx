import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import emptyIMG from '../../assets/empty.jpg'
import { FiEdit2 } from "react-icons/fi";


function Courses() {
  const navigate = useNavigate()
  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div className='w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3'>
                <div className='flex items-center justify-center gap-3'>
                      <FaArrowLeft className='w-[22px] h-[22px] cursor-pointer' onClick={()=>{navigate("/deshboard")}}/>
                      <h1 className='text-2xl font-semibold'>All Created Courses</h1>
                </div>
                <button className='bg-black text-white px-4 py-2 rounded hover:bg-gray-500' onClick={()=>{navigate("//createcourse")}}>Create Course</button>
          </div>

          {/* for large screen table  */}
          <div className='hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto'>
                <table className='min-w-full text-sm'>
                  <thead className='border-b bg-gray-50'>
                    <tr>
                      <th className='text-left py-3 px-4'>Courses</th>
                      <th className='text-left py-3 px-4'>Price</th>
                      <th className='text-left py-3 px-4'>Status</th>
                      <th className='text-left py-3 px-4'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border-b hover:bg-gray-50 transition duration-200'>
                      <td className='py-3 px-4 flex items-center gap-4'>
                        <img src={emptyIMG} className='w-25 h-14 object-cover rounded-md ' alt="" />
                        <span>Title</span>
                      </td>
                      <td className='px-4 py-3'> Null</td>
                      <td className='px-4 py-3'>
                        <span className='px-3 py-1 rounded-full text-xs bg-red-100 text-red-600'>Draft</span>
                      </td>
                      <td className='px-4 py-3'>
                        <FiEdit2  className='text-gray-600 hover:text-blue-600 cursor-pointer'/>

                      </td>
                    </tr>
                  </tbody>
                </table>
          </div>

          {/* for small screen table  */}

          <div>

          </div>
          </div>
    </div>
  )
}

export default Courses