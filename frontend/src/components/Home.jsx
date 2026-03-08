import React, { useEffect } from 'react'
import Navbar from './Navbar'
import HomeSection from './home_components/HomeSection'
import Category from './home_components/Category'
import Latestjobs from './home_components/LatestJobs'
import Footer from './Footer'
import JobboardJobs from './hooks/JobboardJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  JobboardJobs();
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate()

  useEffect(() => {
  if (user && user.role === "recruiter") {
    navigate("/admin");
  }
}, [user]);
  
  return (
    <div className='bg-linear-to-b from-gray-50 to-white'>
        <Navbar/>
        <HomeSection/>
        <Latestjobs/>
        <Footer/>
    </div>
  )
}

export default Home