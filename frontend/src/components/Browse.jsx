import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Jobs from './jobebord_components/FilterJobs'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '../redux/JobSlice'
import GetAppliedjob from './hooks/GetAppliedjob'

const Browse = () => {
    GetAppliedjob()
    const {allJobs} = useSelector(store=>store.job)
    const dispatch = useDispatch()
    useEffect(()=>{
        return() => {
            dispatch(setSearchedQuery(""))
        }
    },[])

  return (
    <div>
        <Navbar/>
        <h1 className='max-w-7xl mx-auto'>Search Result ({allJobs.length}) </h1>
        <div className='max-w-7xl mx-auto my-10 grid grid-cols-3 gap-4'>
            {
                allJobs.map((item) => {
                    return (
                        <Jobs key={item._id} job={item}/>
                    )
                }
            )}
        </div>
    </div>
  )
}

export default Browse