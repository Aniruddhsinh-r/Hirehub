import React from 'react'
import LatestJob from './LatestJob'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io"

const jobs = [1,2,3,4,5,6]
const Latestjobs = () => {
  // const {allJobs} = useSelector(store=>store.job);
  const { allJobs = [] } = useSelector(store => store.job);
  

  return (
    <>
    <section className="w-full  py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
          How Career Connect Works !
        </h3>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
            <FaUserPlus className="text-4xl mx-auto text-blue-600 mb-4" />
            <h4 className="text-lg font-semibold mb-2">Create Account</h4>
            <p className="text-gray-600 text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
            <MdFindInPage className="text-4xl mx-auto text-blue-600 mb-4" />
            <h4 className="text-lg font-semibold mb-2">
              Find a Job / Post a Job
            </h4>
            <p className="text-gray-600 text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
            <IoMdSend className="text-4xl mx-auto text-blue-600 mb-4" />
            <h4 className="text-lg font-semibold mb-2">
              Apply / Recruit Candidates
            </h4>
            <p className="text-gray-600 text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </div>

        </div>
      </div>
    </section>
      
    <div className='w-full mx-auto my-10 px-4 sm:px-14 lg:px-20'>
        <h1 className='text-2xl sm:text-4xl font-bold'><span className='text-purple-700'>Latest</span> Job opening</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-5'>
            {
              allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job, index) => <LatestJob key={job._id} job={job} />)
            }
        </div>
    </div>
    </>
  )
}

export default Latestjobs