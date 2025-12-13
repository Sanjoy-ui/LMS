import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function EditProfile() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [name , setName ] = useState(userData?.name || "")
  const [description , setDescription ] = useState(userData?.description || "")
  const [photoUrl , setPhotoUrl ] = useState(null)
  const dispatch = useDispatch()
  const [loading , setLoading ]= useState(false)

  const handleProfileEdit = async () => {
    setLoading(true)
    try {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        if (photoUrl) {
          formData.append("photoUrl", photoUrl)
        }
        const result = await axios.post(serverUrl + "/api/user/profile" , formData , {
          withCredentials : true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        dispatch(setUserData(result.data))
        setLoading(false)
        navigate("/")
        toast.success("Profile Updated")
    } catch (error) {
        setLoading(false)
        console.log(error)
        toast.error(error?.response?.data?.message || "Edit Profile  Failed")
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative overflow-hidden">
        <div className='absolute top-0 left-0 w-full h-32 bg-black'></div>
        <button onClick={() => navigate("/profile")} className='absolute top-6 left-6 text-white hover:text-gray-300 transition-colors z-10 flex items-center gap-2'>
            <FaArrowLeft size={20} />
            <span className='font-medium'>Back</span>
        </button>

        <div className="relative mt-12 mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Edit Profile</h2>
            <p className="text-gray-500 mt-2">Update your personal information</p>
        </div>

        <form action="" className="space-y-6" onSubmit={(e)=>e.preventDefault()}>
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative group cursor-pointer">
                {photoUrl ? (
                    <img
                        src={URL.createObjectURL(photoUrl)}
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg bg-white"
                        alt="Preview"
                    />
                ) : userData?.photoUrl ? (
                  <img
                    src={userData?.photoUrl}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg bg-white"
                    alt="Profile"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full text-white flex items-center justify-center text-4xl border-4 border-white bg-black shadow-lg">
                    {userData?.name?.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <label htmlFor="image" className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium text-sm">
                    Change Photo
                </label>
            </div>
            <input type="file" id="image" className="hidden" name="photoUrl" accept="image/*" onChange={(e)=>{
                if(e.target.files[0]) setPhotoUrl(e.target.files[0])
            }} />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">Username</label>
                <input type="text" id="name" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition-all" value={name} placeholder={userData?.name} required onChange={(e)=>{
                    setName(e.target.value)
                }}  />
            </div>
            
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input readOnly type="text" className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl text-gray-500 cursor-not-allowed" value={userData?.email} />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="description">Bio</label>
                <textarea rows={4} id="description" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition-all resize-none" value={description} placeholder="Tell us about yourself..." name="description" onChange={(e)=>{
                    setDescription(e.target.value)
                }} />
            </div>
          </div>

          <div className="pt-4">
            <button className="w-full bg-black hover:bg-gray-800 text-white py-3.5 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl active:scale-[0.99] flex items-center justify-center" onClick={handleProfileEdit} disabled= {loading} >
                {loading ? <ClipLoader color="white" size={24}/> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
