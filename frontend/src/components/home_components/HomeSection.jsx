import React, { useState } from 'react'
import { MdLocationOn } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import Category from './Category';
import Searchbar from '../comman/Searchbar';
import { setSearchedQuery } from '../../redux/JobSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const HomeSection = () => {
    const [query, setquery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        console.log("FINAL STATE VALUE:", query)
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }
    const placeholderImage = "https://webtel.in/images/Our-S4HANA-Service.png";

    return (
        <div>
            <div className="w-full bg-white flex items-center justify-center px-4 md:px-14 lg:px-20">
                <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center md:items-start">
                    {/* Left Section */}
                    <div className="w-full md:w-1/2 text-center md:text-left my-10 md:my-4">
                        <h1 className="text-5xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-snug">Take the right steps to find the <span className='text-purple-700'>right job for you</span></h1>
                        <p className="text-gray-500 mt-4 md:mt-6 text-sm md:text-base">Platform users who are passionate about what they do can find a lot of job opportunities.</p>

                        {/* Search Box */}
                        <div className="mt-6 md:mt-10 w-full max-w-3xl">
                            <div className="flex items-center justify-center bg-white overflow-hidden">
                                <Category />
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-1/2 hidden md:flex md:justify-end">
                        <img src={placeholderImage} alt="Professional" className="w-72 md:w-96 lg:w-96 object-cover rounded-lg" />
                    </div>
                </div>
            </div>
            <div className='px-4 my-4'>
                <div className="w-full flex justify-center items-center">
                    <div className="flex items-center w-full max-w-2xl bg-white border border-gray-300 rounded-3xl shadow-sm">
                        <div className="pl-4 text-gray-400"><BiSearch size={22} /></div>
                        <input type="text" placeholder="Find your dream job" className="flex-1 px-6 py-3 outline-none text-gray-700 text-sm md:text-base" onChange={(e) => { setquery(e.target.value) }} />
                        <button className="bg-black text-white px-5 py-3 text-sm md:text-base font-medium transition rounded-r-3xl cursor-pointer" onClick={searchJobHandler}><BiSearch size={22} /></button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default HomeSection