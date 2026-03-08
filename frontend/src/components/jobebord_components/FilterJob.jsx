import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../../redux/JobSlice'
import { motion } from "framer-motion";

const FilterJob = () => {
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")
  const [experience, setExperience] = useState("")
  const [jobType, setJobType] = useState([])
  const [salary, setSalary] = useState("")

  const dispatch = useDispatch()

  const handleJobTypeChange = (value) => {
    setJobType(prev => 
      prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]
    )
  }

  useEffect(() => {
    const query = `${keyword}|${location}|${experience}|${jobType.join(",")}|${salary}`
    dispatch(setSearchedQuery(query))
  }, [keyword, location, experience, jobType, salary, dispatch])

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="w-64 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className='flex items-center justify-between mb-4 border-b pb-2'>
        <h1 className='text-lg font-semibold'>Filter Jobs</h1>
        <button onClick={() => {setKeyword(""); setLocation(""); setExperience(""); setJobType([]); setSalary("");}} className='text-xs text-purple-600 hover:underline'>Clear All</button>
      </div>

      <div className='mb-4'>
        <h3 className="font-semibold text-md mb-2">Keyword</h3>
        <input type="text" placeholder="Search Title..." value={keyword} onChange={(e) => setKeyword(e.target.value)} className='w-full border border-gray-300 rounded-md p-1.5 text-sm outline-none focus:border-purple-500'/>
      </div>

      <div className='mb-4'>
        <h3 className="font-semibold text-md mb-2">Location</h3>
        <input type="text" placeholder="Search location..." value={location}onChange={(e) => setLocation(e.target.value)} className='w-full border border-gray-300 rounded-md p-1.5 text-sm outline-none focus:border-purple-500'/>
      </div>

      <div className='mb-4'>
        <h3 className="font-semibold text-md mb-2">Experience</h3>
        <select value={experience} onChange={(e) => setExperience(e.target.value)} className='w-full border border-gray-300 rounded-md p-1.5 text-sm outline-none bg-white'>
          <option value="">Select Experience</option>
          <option value="0">Fresher</option>
          <option value="1">1-2 Years</option>
          <option value="3">3-5 Years</option>
          <option value="5">5+ Years</option>
        </select>
      </div>

      <div className='mb-4'>
        <h3 className="font-semibold text-md mb-2">Job Type</h3>
        <div className='space-y-1'>
          {["Full Time", "Part Time", "Internship", "Freelance"].map((item) => (
            <label key={item} className='flex items-center gap-2 text-sm cursor-pointer'>
              <input type="checkbox" checked={jobType.includes(item)} onChange={() => handleJobTypeChange(item)} className='accent-purple-600'/>{item}</label>
          ))}
        </div>
      </div>

      <div className='mb-4'>
        <h3 className="font-semibold text-md mb-2">Salary Range</h3>
        <div className='space-y-1'>
          {[
            { label: "0 to 10k", val: "0-10000" },
            { label: "10k to 50k", val: "10000-50000" },
            { label: "50k to 1lac", val: "50000-100000" },
            { label: "1lac+", val: "100000-1000000" }].map((s) => (
            <label key={s.val} className='flex items-center gap-2 text-sm cursor-pointer'>
              <input  type="radio"  name="salary" value={s.val} checked={salary === s.val} onChange={(e) => setSalary(e.target.value)} className='accent-purple-600'/>{s.label}</label>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default FilterJob