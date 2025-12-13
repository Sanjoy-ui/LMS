import React from 'react'
import Nav from '../component/Nav'
import HeroIMG from '../assets/home1.jpg'
import ai from '../assets/ai.png'
import ai1 from '../assets/SearchAi.png'
import { MdPlayCircleOutline } from "react-icons/md";
import Logo from '../component/Logo'
import ExploreCourses from '../component/ExploreCourses'
import CardPage from '../component/CardPage'


function Home() {
  return (
    <div className='w-full overflow-x-hidden'>
       <div className='w-full relative min-h-[600px] lg:h-screen'>
        <Nav />
        <div className='absolute inset-0 z-0'>
            <img src={HeroIMG} className='w-full h-full object-cover' alt="Hero" />
            <div className='absolute inset-0 bg-black/40'></div>
        </div>
        
        <div className='relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-20'>
            <h1 className='text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight'>
                Grow Your Skills to Advance <br className='hidden md:block' /> Your career path
            </h1>
            
            <div className='flex flex-col sm:flex-row items-center gap-4 mt-8'>
                  <button className='px-6 py-3 border-2 border-white text-white rounded-lg text-lg font-medium flex items-center gap-2 hover:bg-white hover:text-black transition-all duration-300'>
                      View All courses <MdPlayCircleOutline className='w-6 h-6'/>
                  </button>
                  <button className='px-6 py-3 bg-white text-black border-2 border-white rounded-lg text-lg font-medium flex items-center gap-2 hover:bg-gray-100 transition-all duration-300'>
                      Search with AI 
                      <img src={ai} className='w-8 h-8 rounded-full hidden lg:block' alt="AI" /> 
                      <img src={ai1} className='w-8 h-8 rounded-full lg:hidden' alt="AI" /> 
                  </button>
            </div>
        </div>
       </div>
       <Logo />
       <ExploreCourses />
       <CardPage />
    </div>
  )
}

export default Home