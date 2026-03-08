import React from 'react'
import { useNavigate } from 'react-router-dom'

const JobCard = ({job}) => {
    const navigate = useNavigate()
  return (
    <div className='relative  p-5 min-h-70 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300' onClick={()=>navigate(`/description/${job._id}`)}>
        <div>
            <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
            <p className='text-sm text-gray-500'>India</p>
        </div>
        <div>
            <h2 className='font-medium text-lg mt-2'>{job?.title}</h2>
            <p className='text-md text-gray-700 line-clamp-5'>{job?.description}</p>
        </div>
        <div className='flex gap-2 mt-4 absolute bottom-4 left-5 right-5'>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 border border-gray-300 text-sm text-blue-600 font-semibold rounded-full cursor-pointer">{job?.position} Position</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 border border-gray-300 text-sm text-red-600 font-semibold rounded-full cursor-pointer">{job?.jobType}</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 border border-gray-300 text-sm text-purple-600 font-semibold rounded-full cursor-pointer">{job?.salary} P/M</span>
        </div>
    </div>
  )
}

export default JobCard