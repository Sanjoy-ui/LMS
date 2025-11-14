import React from 'react'
import { MdOutlineCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaCommentDollar } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { RiUserCommunityLine } from "react-icons/ri";






function Logo() {
  return (
    <div className='w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px]'>
            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl text-[#03394b] bg-gray-200 cursor-pointer'>
                    <MdOutlineCastForEducation className='w-[35px] h-[35px] fill-[#03394b]'/>

                    100+ Online Courses
            </div>
            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl text-[#03394b] bg-gray-200 cursor-pointer'>
                    <SiOpenaccess className='w-[35px] h-[35px] fill-[#03394b]'/>

                    Life Time Access
            </div>
            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl text-[#03394b] bg-gray-200 cursor-pointer'>
                    <FaCommentDollar className='w-[35px] h-[35px] fill-[#03394b]'/>

                    Value For Money
            </div>
            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl text-[#03394b] bg-gray-200 cursor-pointer'>
                    <MdSupportAgent className='w-[35px] h-[35px] fill-[#03394b]'/>

                    LifeTime Support
            </div>
            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl text-[#03394b] bg-gray-200 cursor-pointer'>
                    <RiUserCommunityLine className='w-[35px] h-[35px] fill-[#03394b]'/>

                    Community Support
            </div>
    </div>
  )
}

export default Logo