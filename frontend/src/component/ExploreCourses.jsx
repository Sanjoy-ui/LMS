import React from 'react'
import { MdPlayCircleOutline, MdOutlineImportantDevices, MdOutlineAppSettingsAlt, MdSatellite } from "react-icons/md";
import { SiUikit, SiWeb3Dotjs, SiHiveBlockchain, SiDwavesystems } from "react-icons/si";
import { GiCyberEye } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

function ExploreCourses() {
    const navigate = useNavigate()
    
    const categories = [
        { icon: <MdOutlineImportantDevices size={40} className="text-gray-700" />, name: "Web Development", color: "bg-pink-100" },
        { icon: <SiUikit size={40} className="text-gray-700" />, name: "UI / UX Designing", color: "bg-green-100" },
        { icon: <MdOutlineAppSettingsAlt size={40} className="text-gray-700" />, name: "App Development", color: "bg-red-100" },
        { icon: <SiHiveBlockchain size={40} className="text-gray-700" />, name: "BlockChain", color: "bg-blue-100" },
        { icon: <SiWeb3Dotjs size={40} className="text-gray-700" />, name: "Web 3 Devops", color: "bg-purple-100" },
        { icon: <MdSatellite size={40} className="text-gray-700" />, name: "DSA", color: "bg-cyan-100" },
        { icon: <GiCyberEye size={40} className="text-gray-700" />, name: "Cyber Security", color: "bg-indigo-100" },
        { icon: <SiDwavesystems size={40} className="text-gray-700" />, name: "System Design", color: "bg-orange-100" },
    ]

  return (
    <div className='w-full py-20 px-4 md:px-8 lg:px-16 bg-white'>
        <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20'>
            {/* left div  */}
            <div className='w-full lg:w-1/3 flex flex-col items-start gap-6'>
                <div className='space-y-2'>
                    <h2 className='text-4xl md:text-5xl font-bold text-gray-900 leading-tight'>
                        Explore <br />
                        <span className='text-gray-500'>Our Courses</span>
                    </h2>
                </div>
                <p className='text-lg text-gray-600 leading-relaxed'>
                    Discover a wide range of courses designed to help you master new skills and advance your career. From coding to design, we have something for everyone.
                </p>
                <button 
                    className='group px-8 py-4 bg-black text-white rounded-xl text-lg font-medium flex items-center gap-3 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95' 
                    onClick={()=>{navigate("/allcourses")}}
                >
                    Explore All Courses
                    <MdPlayCircleOutline className='w-6 h-6 group-hover:scale-110 transition-transform'/>
                </button>
            </div>

            {/* right div */}
            <div className='w-full lg:w-2/3'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                    {categories.map((cat, index) => (
                        <div key={index} className='flex flex-col items-center gap-3 group cursor-pointer'>
                            <div className={`w-24 h-24 ${cat.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300`}>
                                {cat.icon}
                            </div>
                            <span className='text-sm font-medium text-gray-700 text-center group-hover:text-black transition-colors'>
                                {cat.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ExploreCourses