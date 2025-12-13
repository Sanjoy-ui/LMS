import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

function CardPage() {
    const {courseData} =  useSelector(state=>state.course)
    const [popularCourses , setPopularCourses] = useState([])
    useEffect(()=>{
        if(courseData && courseData.length > 0) {
            setPopularCourses(courseData.slice(0,6))
        }
    },[courseData])
  return (
    <div className='relative flex items-center justify-center flex-col py-16 bg-gray-50'>
        <h1 className='text-3xl md:text-5xl font-bold text-center text-gray-900 mb-6 px-4'>Our Popular Courses</h1>
        <p className='max-w-3xl text-center text-gray-600 mb-12 px-4 text-lg leading-relaxed'>
            Explore Our Top Courses designed to boost your skills, enhance career, unlock opportunities in tech, AI, Business, and Beyond.
        </p>

        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center'>
                {
                    popularCourses.map((course , index)=>(
                        <Card key={index} thumbnail={course.thumbnail}  title={course.title} category={course.category} price={course.price} id={course._id}/>
                    ))
                }
            </div>
        </div>
        
    </div>
  )
}

export default CardPage