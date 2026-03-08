import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import GetAllAdminJobs from '../hooks/GetAllAdminJobs'
import { setSearchJobByText } from '../../redux/JobSlice'

const AddJobs = () => {
  GetAllAdminJobs()
  const navigation = useNavigate()
  const [input, setinput] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input])
  
  return (
    <div>
      <h1 className='font-bold text-2xl mb-5'>Job Management</h1>
      <div className='max-w-6xl mx-auto my-10 px-8'>
        <div className='flex justify-between'>
          <input type="text" className="border border-gray-400 w-80 h-11 p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="Search by Company name or Job Role." onChange={(e)=>setinput(e.target.value)}/>
          <button className='border border-gray-400 px-8 py-2 font-medium rounded-md shadow-xs text-white bg-gray-800 cursor-pointer hover:bg-gray-900' onClick={() => { navigation("create") }}>Add Jobs</button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  )
}

export default AddJobs