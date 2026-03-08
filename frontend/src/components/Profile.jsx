import React from 'react'
import Navbar from './Navbar'
import AppliedJob from './AppliedJob'
import { useState } from 'react'
import UserProfileDialog from './UserProfileDialog'
import { useSelector } from 'react-redux'
import GetAppliedjob from './hooks/GetAppliedjob'

const Profile = () => {
    // const skills = user?.Profile?.skills
    GetAppliedjob()
    const [open, setopen] = useState(false)
    const isResume = true
    const {user} = useSelector(store => store.auth)

    return (
        <div>
            <Navbar />
            <div className='max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-5 sm:p-8'>
                <div className='flex justify-between gap-4'>
                    <div className='flex items-start gap-4'>
                        <div className='w-22 h-22 min-w-22 border border-gray-200 flex items-center justify-center rounded-2xl shrink-0 overflow-hidden'>
                            <img src={user?.profile?.profilePhoto} alt="ProfilePic" className='w-25 h-25 object-contain' />
                        </div>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile.bio}</p>
                        </div>
                    </div>
                    <div className='border-2 h-10 border-gray-300 px-2.5 py-1.5 rounded-full' onClick={()=>setopen(true)}><i className="fa-solid fa-pen"></i></div>
                </div>
                <div className='p-5'>
                    <div className='my-2'> 
                        <i class="fa-solid fa-envelope mr-2"></i>
                        <span>{user?.email}</span>
                    </div>
                    <div className='my-2'>
                        <i class="fa-solid fa-address-book mr-2"></i>
                        <span>{user?.phoneNo}</span>
                    </div>
                </div>
                <div>
                    <h2 className='text-xl font-semibold'>Skills</h2>
                    {
                        user?.profile?.skills.length > 0 ? user?.profile?.skills.map((item,index) => ( <span key={index} className="inline-flex items-center px-4 py-1.5 bg-gray-200 text-gray-700 font-medium rounded-full mr-2 my-2">{item}</span> )) : <span>No Skills</span>
                    }
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <h2 className='text-xl font-semibold'>Resume</h2>
                    {
                        isResume ? <a target='_blank' className='text-blue-800 font-semibold' href={user?.profile?.resume}>{user?.profile?.resumeOriginalName}</a> : <span>No resume</span>
                    }
                </div>
            </div>
            <div>
                <AppliedJob/>
            </div>
            <UserProfileDialog open={open} setopen={setopen}/>
        </div>
    )
}

export default Profile