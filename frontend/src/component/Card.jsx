import React from 'react'
import { FaStar } from "react-icons/fa6";


function Card({thumbnail , title , category , price , id}) {
  return (
    <div className='w-full max-w-[350px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer'>
            <div className='relative overflow-hidden'>
                <img src={thumbnail} className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500' alt={title} />
                <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-gray-700 shadow-sm'>
                    {category}
                </div>
            </div>
            <div className='p-5'>
                <h2 className='text-lg font-bold text-gray-900 mb-2 line-clamp-2 h-14'> {title} </h2>
                
                <div className='flex items-center justify-between mt-4 pt-4 border-t border-gray-100'>
                    <span className='text-lg font-bold text-blue-600'>₹{price}</span>
                    <div className='flex items-center gap-1 text-sm font-medium text-gray-600'>
                        <FaStar className='text-yellow-400 w-4 h-4'/>
                        <span>4.5</span>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Card