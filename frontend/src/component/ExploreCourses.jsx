import React from 'react'
import { MdPlayCircleOutline } from "react-icons/md";
import { MdOutlineImportantDevices } from "react-icons/md";
import { SiUikit } from "react-icons/si";
import { MdOutlineAppSettingsAlt } from "react-icons/md";
import { SiWeb3Dotjs } from "react-icons/si";
import { SiHiveBlockchain } from "react-icons/si";
import { MdSatellite } from "react-icons/md";
import { GiCyberEye } from "react-icons/gi";
import { SiDwavesystems } from "react-icons/si";









function ExploreCourses() {
  return (
    <div className='w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]'>
        {/* left div  */}
        <div className='w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px] '>
            <span className='text-[35px] font-semibold'>Explore </span>
            <span className='text-[35px] font-semibold'>Our Courses</span>
            <p className='text-[17px] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nobis nihil porro necessitatibus alias quas ratione quibusdam quia ea corrupti, asperiores, at natus laborum vel deleniti eius dignissimos cum praesentium.</p>
            <button className='px-[20px] py-[10px] border-2 bg-[black] border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[40px]  '>Explore Courses<MdPlayCircleOutline className='w-[30px] h-[30px] lg:text-white text-black cursor-pointer'/></button>
        </div>
        {/* right div */}
        <div className='w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex gap-5 items-center justify-center lg:gap-[60px] flex-wrap mb-[60px] lg:mb-[0px] '>
                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center '>
                            <MdOutlineImportantDevices  className='w-[60px] h-[60px] text-[#6d6c6c]' color='white'/>

                    </div>
                    Web Development
                </div>

                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#afd39f] rounded-lg flex items-center justify-center '>
                            <SiUikit  className='w-[60px] h-[60px] text-[#6d6c6c]' color='white'/>

                    </div>
                    UI / UX Designing
                </div>

                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#ef9797] rounded-lg flex items-center justify-center '>
                            <MdOutlineAppSettingsAlt  className='w-[60px] h-[60px] text-[#6d6c6c]' color='white'/>

                    </div>
                    App Development
                </div>

                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#5c99da] rounded-lg flex items-center justify-center '>
                            <SiHiveBlockchain  className='w-[60px] h-[60px] text-[#6d6c6c]' color='white'/>

                    </div>
                    BlockChain Development
                </div>

                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#c5a7c5] rounded-lg flex items-center justify-center '>
                            <SiWeb3Dotjs  className='w-[60px] h-[60px] text-[#6d6c6c]' color='white'/>

                    </div>
                    Web 3 Devops
                </div>

                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#d1f6f6] rounded-lg flex items-center justify-center '>
                            <MdSatellite  className='w-[60px] h-[60px] text-[#6d6c6c]' color='white'/>

                    </div>
                    DSA
                </div>

                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#6377e8] rounded-lg flex items-center justify-center '>
                            <GiCyberEye  className='w-[60px] h-[60px] text-[#6d6c6c]' color='white'/>

                    </div>
                    Cyber Security
                </div>

                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#f06868] rounded-lg flex items-center justify-center '>
                            <SiDwavesystems  className='w-[60px] h-[60px] text-[#6d6c6c]' color='white'/>

                    </div>
                   System Design
                </div>
        </div>
    </div>
  )
}

export default ExploreCourses