import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { JOB_API_ENDPOINT } from '../utils/constant';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

const SavedJobsPage = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/savedjobs`, { withCredentials: true });
                if (res.data.success) setSavedJobs(res.data.savedJobs);
            } catch (error) {
                console.log(error);
            }
        }
        fetchSavedJobs();
    }, []);

    return (
        <div className='min-h-screen bg-white font-sans'>
            <Navbar />
            <div className='max-w-5xl mx-auto m-6 px-6'>
                <h1 className='text-[40px] font-bold text-[#2d2d2d] mb-4 tracking-tight'>My jobs</h1>

                <div className='flex items-end border-b border-[#e4e2e0] gap-8'>
                    <div className='pb-3 border-b-4 border-black px-2 cursor-pointer'>
                        <div className='text-[16px] font-semibold text-center'>{savedJobs.length}</div>
                        <div className='text-[16px] font-semibold text-black'>Saved</div>
                    </div>
                    
                    <div className='pb-3 px-2 cursor-pointer group'>
                        <div className='text-[16px] font-medium text-[#767676] group-hover:text-black text-center'>0</div>
                        <div className='text-[16px] font-medium text-[#767676] group-hover:text-black'>Applied</div>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <AnimatePresence mode='popLayout'>
                        {savedJobs.length > 0 ? (
                            savedJobs.map((job, index) => (
                                <motion.div
                                    key={job._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                    className='flex items-start justify-between py-6 border-b border-[#e4e2e0] group'
                                >
                                    <div className='flex gap-6'>
                                        <div className='w-16 h-16 bg-[#f3f2f1] rounded-xl flex items-center justify-center border border-[#e4e2e0] overflow-hidden'>
                                            {job.company?.logo ? (
                                                <img src={job.company.logo} alt="logo" className='w-16 h-16 object-contain' />
                                            ) : (
                                                <i className="fa-solid fa-building text-[#767676] text-2xl"></i>
                                            )}
                                        </div>

                                        <div className='flex flex-col gap-1'>
                                            <h2 onClick={() => navigate(`/Description/${job._id}`)} className='text-[20px] font-bold text-[#2d2d2d] leading-tight hover:underline cursor-pointer'>{job.title}</h2>
                                            <p className='text-[18px] text-[#2d2d2d]'>{job.company?.name}</p>
                                            <p className='text-[16px] text-[#767676]'>{job.location}</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className='flex items-center gap-8'>
                                        <button onClick={() => navigate(`/Description/${job._id}`)} className='bg-[#2557a7] text-white px-8 py-2.5 rounded-xl font-bold text-[18px] hover:bg-[#164081] transition-all'>Apply now</button>
                                        
                                        <div className='flex items-center gap-2'>
                                            <button className='p-2 hover:bg-[#f3f2f1] rounded-full transition-all'>
                                                <i className="fa-solid fa-bookmark text-[#2d2d2d] text-xl"></i>
                                            </button>
                                            <button className='p-2 hover:bg-[#f3f2f1] rounded-full transition-all'>
                                                {/* <i className="fa-solid fa-ellipsis-vertical text-[#2d2d2d] text-xl"></i> */}
                                                <i className="fa-solid fa-ellipsis text-[#2d2d2d] text-xl"></i>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className='py-20 text-center'>
                                <p className='text-[#767676] text-[18px]'>No saved jobs found.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                
            </div>
        </div>
    );
};

export default SavedJobsPage;