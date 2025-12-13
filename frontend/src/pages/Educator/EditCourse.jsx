import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import img from "../../assets/empty.jpg"
import { FiEdit2 } from "react-icons/fi";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlice";

function EditCourse() {
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(false);
  const thumb = useRef()
  const [selectCourse , setSelectCourse] = useState(null)
  const [title , setTitle] = useState("")
  const [subTitle , setSubTitle ] = useState("")
  const [description , setDescription ] = useState("")
  const [category , setCategory ] = useState("")
  const [Level  , setLevel ] = useState("")
  const [price  , setPrice ] = useState("")
  const [frontendImage  , setFrontendImage ] = useState(img)
  const [backendImage  , setBackendImage ] = useState(null)
  const handleThumbnail = (e)=>{
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  const [loading ,setLoading ]= useState(false)
  const [loading1 ,setLoading1 ]= useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const dispatch = useDispatch()
  const {courseData} =  useSelector(state=>state.course)

  const {courseId} = useParams()
  const getCourseById = async () => {
      try {
        const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}` , {withCredentials:true})
        setSelectCourse(result.data)
        console.log(result.data)
        setPageLoading(false)
      } catch (error) {
          console.log(error)
          toast.error("Failed to load course")
          setPageLoading(false)
      }
  }

  const handleRemoveCourse = async () => {
      const confirmed = window.confirm("Are you sure you want to delete this course? This action cannot be undone.")
      if (!confirmed) return
      
      setLoading1(true)
      try {
        const result = await axios.delete(serverUrl + `/api/course/remove/${courseId}` , {withCredentials:true})
        if(courseData && Array.isArray(courseData)) {
          const filterCourse = courseData.filter(c =>c._id !== courseId)
          dispatch(setCourseData(filterCourse))
        }
        setLoading1(false)
        console.log(result.data)
        toast.success("Course removed successfully")
        navigate("/courses")
      } catch (error) {
        console.log(error)
        setLoading1(false)
        toast.error(error.response?.data?.message || "Failed to remove course")
      }
  }

  useEffect(()=>{
      if(selectCourse){
        setTitle(selectCourse.title || "")
        setSubTitle(selectCourse.subTitle || "")
        setDescription(selectCourse.description || "")
        setCategory(selectCourse.category || "")
        setLevel(selectCourse.Level || "")
        setPrice(selectCourse.price || "")
        setFrontendImage(selectCourse.thumbnail || img)
        setIsPublished(selectCourse?.isPublished)
      }
  },[selectCourse])

  useEffect(()=>{
    getCourseById()
  
  },[courseId])

  const handleEditCourse = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append("title" , title )
    formData.append("subTitle" , subTitle )
    formData.append("description" , description )
    formData.append("category" , category )
    formData.append("level" , Level )
    formData.append("price" , price )
    formData.append("thumbnail" , backendImage )
    formData.append("isPublished" , isPublished )
      try {
        const result = await axios.post(serverUrl + `/api/course/editcourse/${courseId}` , formData , {withCredentials:true})
        console.log(result.data)
        const updateData = result.data
        if(courseData && Array.isArray(courseData)) {
          if(updateData.isPublished){
            const updateCourses = courseData.map(c=>c._id === courseId ? updateData : c)
            if(!courseData.some(c=>c._id === courseId)){
              updateCourses.push(updateData)
            }
            dispatch(setCourseData(updateCourses))
          } else{
              const filterCourse  = courseData.filter(c=>c._id !== courseId)
              dispatch(setCourseData(filterCourse))
          }
        }
        setLoading(false)
        navigate("/courses")
        toast.success("Course updated successfully")
      } catch (error) {
        console.log(error)
        setLoading(false)
        toast.error(error.response?.data?.message || "Failed to update course")
      }
  }

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClipLoader size={50} color="black" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* top bar  */}
      <div className="flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative">
        <FaArrowLeft
          className="top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer"
          onClick={() => {
            navigate("/courses");
          }}
        />
        <h2 className="text-2xl font-semibold md:pl-[60px]">
          Add Details and info regarding course
        </h2>
        <div className="space-x-2 space-y-2">
          <button className="bg-black text-white px-4 py-2 rounded-md ">
            Go to lectures page
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Course info</h2>
        <div className="space-x-2 space-y-2">
          {!isPublished ? (
            <button
              className="bg-green-100 text-green-600 px-4 py-2 rounded-md border-1  "
              onClick={() => {
                setIsPublished((prev) => !prev);
              }}
            >
              Click to publish
            </button>
          ) : (
            <button
              className="bg-red-100 text-red-600 px-4 py-2 rounded-md border-1  "
              onClick={() => {
                setIsPublished((prev) => !prev);
              }}
            >
              Click to not publish
            </button>
          )}
          <button onClick={handleRemoveCourse} disabled={loading1} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            {loading1 ? <ClipLoader size={20} color='white' /> : "Remove Course"}
          </button>
        </div>

        <form onSubmit={(e)=>e.preventDefault()} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input onChange={(e)=>{setTitle(e.target.value)}} value={title}
              type="text"
              id="title"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Course title"
            />
          </div>

          <div>
            <label
              htmlFor="subtitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subtitle
            </label>
            <input onChange={(e)=>{setSubTitle(e.target.value)}} value={subTitle}
              type="text"
              id="subtitle"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Subtitle"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea onChange={(e)=>{setDescription(e.target.value)}} value={description}
              type="text"
              id="description"
              className="w-full border px-4 py-2 rounded-md h-24 resize-none"
              placeholder="description"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <label
                htmlFor="select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Category
              </label>
              <select onChange={(e)=>{setCategory(e.target.value)}} value={category}
                name=""
                id="select"
                className="w-full border px-4 py-2 bg-white rounded-md"
              >
                <option value="">Select Category</option>
                <option value="App Development">App Development</option>
                <option value="Web Development">Web Development</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="DSA">DSA</option>
                <option value="System Design">System Design</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Prompt Engneering">Prompt Engneering</option>
              </select>
            </div>
            <div className="flex-1">
              <label
                htmlFor="select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Level
              </label>
              <select onChange={(e)=>{setLevel(e.target.value)}} value={Level}
                name=""
                id="select"
                className="w-full border px-4 py-2 bg-white rounded-md"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            

            <div className="flex-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Price
              </label>
                <input onChange={(e)=>{setPrice(e.target.value)}} value={price} type="number" id="price" name="price" className="w-full border px-4 py-2 rounded-md" placeholder="₹" />
            </div>

              

              

          </div>

          <div className="">
                <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
                <input type="file" hidden ref={thumb} accept="image/*" onChange={handleThumbnail} />
                
              </div>

          <div className="relative w-[300px] h-[170px]">
                      <img src={frontendImage} alt="" onClick={()=>thumb.current.click()} className="w-[100%] h-[100%] border-1 border-black rounded-[5px]" />
                      <FiEdit2 onClick={()=>thumb.current.click()} className="w-[20px] h-[20px] absolute top-2 right-2"/>
              </div>

          <div className="flex items-center justify-start gap-[15px] ">
              <button className="bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black cursor-pointer px-4 py-2 rounded-md" onClick={()=>{navigate("/courses")}}>Cancel</button>
              <button className="bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer" onClick={handleEditCourse}>{loading ? <ClipLoader size={30} color="white"/> : "Save"}</button>
          </div>


        </form>
      </div>
    </div>
  );
}

export default EditCourse;
