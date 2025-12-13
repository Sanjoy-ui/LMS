import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setCreatorCourseData, setCourseData } from '../../redux/courseSlice';

function CreateCourses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {creatorCourseData, courseData} = useSelector(state=>state.course);
  const [title , setTitle ]= useState("")
  const [category , setCategory ] = useState("")
  const [loading , setLoading] = useState(false)

  const handleCreateCourses = async () => {
      setLoading(true)
      try {
          const result =await axios.post(serverUrl + "/api/course/create" , {title , category} , {withCredentials:true})
          console.log(result.data)
          const newCourse = result.data;
          
          // Update creator courses
          if(creatorCourseData && Array.isArray(creatorCourseData)) {
            dispatch(setCreatorCourseData([...creatorCourseData, newCourse]))
          } else {
            dispatch(setCreatorCourseData([newCourse]))
          }
          
          // If the course is published, add to courseData as well
          if(newCourse.isPublished && courseData && Array.isArray(courseData)) {
            dispatch(setCourseData([...courseData, newCourse]))
          }
          
          setLoading(false)
          toast.success("Course Created")
          navigate("/courses")
      } catch (error) {
          console.log(error)
          toast.error(error.response.data.message)
      }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10'>
        <div className='max-w-2xl w-full mx-auto p-8 bg-white shadow-2xl rounded-2xl relative overflow-hidden'>
            <div className='absolute top-0 left-0 w-full h-2 bg-black'></div>
            <button onClick={()=>{navigate("/courses")}} className='absolute top-8 left-8 text-gray-500 hover:text-black transition-colors'>
                <FaArrowLeft size={20} />
            </button>
            
            <div className='text-center mb-10 mt-4'>
                <h2 className='text-3xl font-bold text-gray-900'>Create New Course</h2>
                <p className='text-gray-500 mt-2'>Start building your next masterpiece</p>
            </div>

            <form className='space-y-6' onSubmit={(e)=> e.preventDefault()}>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor="title">Course Title</label>
                <input 
                    onChange={(e)=>{setTitle(e.target.value)}} 
                    value={title} 
                    className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all' 
                    type="text" 
                    id='title' 
                    placeholder='e.g., Advanced React Patterns' 
                />
              </div>
              
              <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor="category">Course Category</label>
                  <div className='relative'>
                      <select 
                        onChange={(e)=>{setCategory(e.target.value)}} 
                        className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all appearance-none bg-white' 
                        id="category"
                      >
                        <option value="">Select a category...</option>
                        <option value="App Development">App Development</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Ethical Hacking">Ethical Hacking</option>
                        <option value="DSA">DSA</option>
                        <option value="System Design">System Design</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Prompt Engneering">Prompt Engneering</option>
                      </select>
                      <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500'>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                  </div>
              </div>

              <div className='pt-4'>
                  <button 
                    onClick={handleCreateCourses} 
                    className='w-full bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.99] transition-all shadow-lg hover:shadow-xl flex items-center justify-center' 
                    disabled={loading}
                  >
                    {loading ? <ClipLoader size={24} color='white' /> : "Create Course"}
                  </button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default CreateCourses