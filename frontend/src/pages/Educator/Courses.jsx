import React, { useEffect } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import emptyIMG from '../../assets/empty.jpg'
import { FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../../App';
import { setCreatorCourseData } from '../../redux/courseSlice';


function Courses() {
  const navigate = useNavigate()
  const {creatorCourseData} = useSelector(state=>state.course)
  const dispatch = useDispatch()
  const {userData} = useSelector(state=>state.user)
  
    useEffect(()=>{
            const creatorCourse = async () => {
                try {
                    const result = await axios.get(serverUrl + "/api/course/getcreator" , {withCredentials : true})
                    console.log(result.data)
                    dispatch(setCreatorCourseData(result.data))
                } catch (error) {
                    console.log(error)

                }
            }

            creatorCourse()
        },[userData])
 

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div className='w-full min-h-screen p-4 sm:p-8 bg-gray-100'>
          <div className='max-w-6xl mx-auto'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
                    <div className='flex items-center gap-4'>
                        <button onClick={()=>{navigate("/deshboard")}} className='p-2 hover:bg-gray-200 rounded-full transition-colors'>
                            <FaArrowLeft className='w-5 h-5 text-gray-600'/>
                        </button>
                        <div>
                            <h1 className='text-3xl font-bold text-gray-900'>My Courses</h1>
                            <p className='text-gray-500 text-sm mt-1'>Manage and edit your created courses</p>
                        </div>
                    </div>
                    <button className='bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2' onClick={()=>{navigate("/createcourse")}}>
                        <span>+ Create New Course</span>
                    </button>
            </div>

            {/* for large screen table  */}
            <div className='hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100'>
                    <table className='min-w-full text-sm'>
                    <thead className='bg-gray-50 border-b border-gray-100'>
                        <tr>
                        <th className='text-left py-4 px-6 font-semibold text-gray-600 uppercase tracking-wider text-xs'>Course Details</th>
                        <th className='text-left py-4 px-6 font-semibold text-gray-600 uppercase tracking-wider text-xs'>Price</th>
                        <th className='text-left py-4 px-6 font-semibold text-gray-600 uppercase tracking-wider text-xs'>Status</th>
                        <th className='text-right py-4 px-6 font-semibold text-gray-600 uppercase tracking-wider text-xs'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                            {creatorCourseData?.length > 0 ? creatorCourseData?.map((course , index)=>(

                        <tr key={index} className='hover:bg-gray-50 transition-colors duration-200 group'>
                        <td className='py-4 px-6'>
                            <div className='flex items-center gap-4'>
                                <div className='w-16 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0'>
                                    {course?.thumbnail ? <img src={course?.thumbnail} className='w-full h-full object-cover' alt="" /> : <img src={emptyIMG} className='w-full h-full object-cover opacity-50' alt="" />}
                                </div>
                                <span className='font-medium text-gray-900 line-clamp-1'>{course?.title}</span>
                            </div>
                        </td>
                        <td className='px-6 py-4 font-medium text-gray-700'> 
                            {course?.price ? `$${course?.price}` : <span className='text-gray-400 italic'>Free</span>} 
                        </td>
                        <td className='px-6 py-4'>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.isPublished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800" } `}>
                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${course.isPublished ? "bg-green-500" : "bg-yellow-500"}`}></span>
                                {course.isPublished?  "Published" :"Draft"}
                            </span>
                        </td>
                        <td className='px-6 py-4 text-right'>
                            <button onClick={()=>{navigate(`/editcourse/${course?._id}`)}} className='p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all'>
                                <FiEdit2 size={18} />
                            </button>
                        </td>
                        </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className='py-12 text-center text-gray-500'>
                                    No courses found. Start by creating one!
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </table>
            </div>

            {/* for small screen table  */}

            <div className='md:hidden space-y-4'> 
                    {creatorCourseData?.length > 0 ? creatorCourseData?.map((course , index)=>(
                    <div key={index} className='bg-white rounded-xl shadow-sm p-4 flex flex-col gap-4 border border-gray-100'>
                        <div className='flex gap-4 items-start'>
                            <div className='w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0'>
                                {course?.thumbnail ? <img src={course?.thumbnail} className='w-full h-full object-cover' alt="" /> :<img src={emptyIMG} className='w-full h-full object-cover opacity-50' alt="" />}
                            </div>
                            <div className='flex-1 min-w-0'>
                                <h2 className='font-bold text-gray-900 line-clamp-2 mb-1'>{course?.title}</h2>
                                <p className='text-gray-500 text-sm font-medium'>{course?.price ? `$${course?.price}` : "Free"}</p>
                            </div>
                        </div>
                        
                        <div className='flex items-center justify-between pt-4 border-t border-gray-50'>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.isPublished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800" } `}>
                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${course.isPublished ? "bg-green-500" : "bg-yellow-500"}`}></span>
                                {course.isPublished?  "Published" :"Draft"}
                            </span>
                            
                            <button onClick={()=>{navigate(`/editcourse/${course?._id}`)}} className='flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors'>
                                <FiEdit2 size={16} />
                                <span>Edit</span>
                            </button>
                        </div>
                    </div>
                    )) : (
                        <div className='text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100'>
                            No courses found. Start by creating one!
                        </div>
                    )}
            </div>
          </div>
      </div>
    </div>
  )
}

export default Courses