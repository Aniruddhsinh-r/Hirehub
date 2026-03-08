import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Job from './jobebord_components/FilterJobs'
import Footer from './Footer'
import FilterJob from './jobebord_components/FilterJob'
import Searchbar from './comman/Searchbar'
import { useSelector } from 'react-redux'
import { motion } from "framer-motion";

export const Jobs = () => {
  // const jobArr = [1, 2, 3, 4, 5, 6, 7, 8]
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setfilterJobs] = useState(allJobs)

  useEffect(() => {
    if (searchedQuery) {
      const queryParts = searchedQuery.toLowerCase().split('|');
      const [keyword, loc, exp, types, sal] = queryParts;

      const filteredJobs = allJobs.filter((job) => {
        const matchesKeyword = !keyword ||
          job.title?.toLowerCase().includes(keyword) ||
          job.description?.toLowerCase().includes(keyword);

        const matchesLocation = !loc || job.location?.toLowerCase().includes(loc);
        const matchesExperience = !exp || job.experienceLevel?.toString() === exp;

        const selectedTypes = types ? types.split(',') : [];
        const matchesJobType = selectedTypes.length === 0 || selectedTypes.includes(job.jobType?.toLowerCase());

        let matchesSalary = true;
        if (sal) {
          const [min, max] = sal.split('-').map(Number);
          const jobSalary = Number(job.salary);
          matchesSalary = jobSalary >= min && jobSalary <= max;
        }
        return matchesKeyword && matchesLocation && matchesExperience && matchesJobType && matchesSalary;
      });
      setfilterJobs(filteredJobs);
    } else {
      setfilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);
  return (
    <div className='bg-linear-to-b from-gray-50 to-white'>
      <Navbar />
      <div className='max-w-7xl mx-auto my-12'>
        <h1 className='text-2xl sm:text-4xl font-bold'>Find your <span className='text-purple-700'>Dream</span> Job</h1>
        <div className='mt-8 mb-8'>
          <div>
            <Searchbar />
          </div>
        </div>
        <div className='flex gap-5'>
          <div className='w-20%'>
            <FilterJob />
          </div>
          <div className='flex-1 h-screen overflow-y-auto pb-5'>
            {
              filterJobs.length <= 0 ? (
                <div className="flex flex-col items-center justify-center mt-20">
                  <h2 className="text-xl font-semibold text-gray-500">Sorry, Job Not Found</h2>
                  <p className="text-gray-400">Try adjusting your filters or search keywords.</p>
                </div>
              ) : (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  {filterJobs.map((job) => (
                    <motion.div 
                    initial={{opacity:0,x:100}}
                    animate={{opacity:1,x:0}}
                    exit={{opacity:0,x:-100}}
                    transition={{duration:0.4}} key={job?._id}>
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              )
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
