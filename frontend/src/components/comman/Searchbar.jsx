import React, { useState } from 'react'
import { BiSearch } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../../redux/JobSlice';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [query, setquery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const searchJobHandler = () => {
  //   dispatch(setSearchedQuery(query))
  //   navigate("/browse")
  // }
  return (
    <div className="w-full flex justify-center items-center">
        {/* <div className="flex items-center w-full max-w-2xl bg-white border border-gray-300 rounded-3xl shadow-sm">
            <div className="pl-4 text-gray-400"><BiSearch size={22} /></div>
            <input type="text" placeholder="Find your dream job" className="flex-1 px-6 py-3 outline-none text-gray-700 text-sm md:text-base" onChange={(e)=>{setquery(e.target.value)}}/>
            <button className="bg-black text-white px-5 py-3 text-sm md:text-base font-medium transition rounded-r-3xl cursor-pointer" onClick={searchJobHandler}><BiSearch size={22}/></button>
        </div> */}
    </div>
  )
}

export default Searchbar