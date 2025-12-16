import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../component/Card'
import { FaSearch } from "react-icons/fa";
import Nav from '../component/Nav';

function AllCourses() {
  const { courseData } = useSelector(state => state.course)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCourses, setFilteredCourses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "App Development", "Web Development", "Cyber Security", "UI/UX", "Ethical Hacking", "DSA", "System Design", "Software Development", "Prompt Engneering"]

  useEffect(() => {
    if (courseData) {
      let result = courseData;
      
      if (selectedCategory !== "All") {
        result = result.filter(course => course.category === selectedCategory)
      }

      if (searchQuery) {
        result = result.filter(course => 
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }

      setFilteredCourses(result)
    }
  }, [courseData, searchQuery, selectedCategory])

  return (
    <div className='min-h-screen bg-gray-50'>
      <Nav />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Explore All Courses</h1>
          <p className='text-gray-600 max-w-2xl mx-auto'>Discover our wide range of courses and start your learning journey today.</p>
        </div>

        {/* Filters and Search */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
            {/* Search */}
            <div className='relative w-full md:w-96'>
                <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <input 
                    type="text" 
                    placeholder="Search courses..." 
                    className='w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Category Filter */}
            <div className='w-full md:w-auto'>
                <select 
                    className='w-full md:w-auto px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black bg-white cursor-pointer'
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center'>
                {filteredCourses.map((course, index) => (
                    <Card 
                        key={index} 
                        thumbnail={course.thumbnail} 
                        title={course.title} 
                        category={course.category} 
                        price={course.price} 
                        id={course._id}
                    />
                ))}
            </div>
        ) : (
            <div className='text-center py-20'>
                <h3 className='text-xl font-medium text-gray-900'>No courses found</h3>
                <p className='text-gray-500 mt-2'>Try adjusting your search or filter to find what you're looking for.</p>
            </div>
        )}
      </div>
    </div>
  )
}

export default AllCourses