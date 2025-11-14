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
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative ">
        <FaArrowLeft
          className=" absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Profile</h2>
        <form action="" className="space-y-5" onSubmit={(e)=>e.preventDefault()}>
          <div className="flex flex-col items-center text-center">
            {userData?.photoUrl ? (
              <img
                src={userData?.photoUrl}
                className="w-24 h-24 rounded-full object-cover border-4 border-[black] "
                alt=""
              />
            ) : (
              <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white">
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 " htmlFor="image">Select Avatar :</label>
            <input type="file" id="image" className="cursor-pointer w-full px-4 py-2 border rounded-md text-sm" name="photoUrl" placeholder="PhotoUrl" accept="image/*"  onChange={(e)=>{
                setPhotoUrl(e.target.files[0])
            }} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 " htmlFor="name">Username :</label>
            <input type="text" id="name" className="cursor-pointer w-full px-4 py-2 border rounded-md text-sm"  value={name} placeholder={userData?.name} required onChange={(e)=>{
                setName(e.target.value)
            }}  />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 ">Email :</label>
            <input readOnly type="text" id="email" className="cursor-pointer w-full px-4 py-2 border rounded-md text-sm" placeholder={userData?.email}  />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 " htmlFor="description">Bio :</label>
            <textarea type="text" rows={3} id="description" className="cursor-pointer mt-1 w-full px-4 py-2 border-gray-300 border rounded-md resize-none focus:ring-2 focus:ring-[black]"  value={description}  placeholder={userData?.description} name="description"  onChange={(e)=>{
                setDescription(e.target.value)
            }} />
          </div>
          <button className="w-full bg-[black] active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer" onClick={handleProfileEdit} disabled= {loading} >{loading? <ClipLoader color="white" size={30}/> : "Save Changes"}</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
