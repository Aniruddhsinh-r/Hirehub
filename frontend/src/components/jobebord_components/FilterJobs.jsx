import React from 'react'
import Navbar from '../Navbar'
import JobCard from '../home_components/LatestJob'
import Searchbar from '../comman/Searchbar'
import { useNavigate } from 'react-router-dom'
import { JOB_API_ENDPOINT } from '../../utils/constant'
import axios from 'axios'
import { toast } from 'react-toastify'

const FilterJobs = ({job}) => { 
  const navigate = useNavigate()

  const daysAgoFunction = (mongodbTime) =>{
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date();
    const timeDiffrence = currentTime - createdAt
    return Math.floor(timeDiffrence/ (1000*24*60*60))
  }

  const saveJobHandler = async () => {
    try {
      const res = await axios.post(`${JOB_API_ENDPOINT}/save/${job?._id}`, {}, {withCredentials: true});

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      navigate("/Signin");
      toast(error.response?.data?.message || "Something went wrong");
    }
  }
  
  return (
    <div className='p-5 rounded-md shadow-xl max-h-85 bg-white border border-gray-100 curser-pointer'>
      <div className='flex items-center justify-between'>
        <p>{daysAgoFunction(job?.createdAt) == 0 ? "today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <button className='border-2 border-gray-300 px-2.5 py-1 rounded-full cursor-pointer'><i className="fa-regular fa-bookmark"></i></button>
      </div>
      <div className='flex items-center mt-2'>
        <div className='w-12 h-12 flex items-center justify-center rounded-xl border border-gray-300 bg-white shadow-sm mr-2'>
          <img src={job?.company?.logo} alt="Logo" className='w-10 h-10 object-contain'/>
        </div>
        <div>
          <h2 className='font-medium text-lg'>{job?.company?.name}</h2>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>
      <div className='justify-between min-h-24'>
        <h2 className='font-medium text-lg mt-3'>{job?.title}</h2>
        <p className='text-gray-700 line-clamp-3'>{job?.description}</p>
      </div>
      <div className='flex flex-wrap gap-2 mt-3'>
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 border border-gray-300 text-sm text-blue-600 font-semibold rounded-full cursor-pointe">{job?.position} Position</span>
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 border border-gray-300 text-sm text-red-600 font-semibold rounded-full cursor-pointer">{job?.jobType}</span>
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 border border-gray-300 text-sm text-purple-600 font-semibold rounded-full cursor-pointer">{job?.salary} PM</span>
      </div>
      <div className='mt-4'>
        <button className='px-4 py-2 font-semibold bg-gray-100 mr-4 rounded-lg shadow-sm cursor-pointer duration-300 hover:bg-gray-200' onClick={()=> navigate(`/Description/${job?._id}`)}>Details</button>
        <button className='px-4 py-2 font-semibold bg-[#7209b7] text-white rounded-lg cursor-pointer duration-300 hover:bg-[#62089d]' onClick={saveJobHandler}>Save For Later</button>
      </div>
    </div>
  )
}

export default FilterJobs