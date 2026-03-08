import React from 'react'
import Navbar from '../Navbar'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'

const Dashboard = () => {
    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = React.useState(null)
    const toggleMenu = (menu) => {
  setOpenMenu(openMenu === menu ? null : menu)
}

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex flex-1'>
                <div className='border-r border-gray-200 bg-white min-h-[calc(100-64px)]'>
                    <ul className='flex flex-col mt-4'>
                        {/* <NavLink to="/admin/jobs" className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500 font-semibold'}`}>
                            <i className="fa-regular fa-square-plus text-lg"></i>
                            <span className="text-sm max-sm:hidden">Add Job</span>
                        </NavLink> */}

                        <li>
                            <button onClick={() => toggleMenu('jobs')} className={`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 cursor-pointer ${openMenu === 'jobs' && 'bg-blue-100 border-r-4 border-blue-500 font-semibold'}`}>
                                <i className="fa-regular fa-square-plus text-lg"></i>
                                <span className="text-sm max-sm:hidden">Manage Jobs</span>
                                <motion.i className="fa-solid fa-chevron-down text-xs ml-auto max-sm:hidden" animate={{ rotate: openMenu === 'jobs' ? 180 : 0 }} transition={{ duration: 0.25 }} />
                            </button>
                            <AnimatePresence initial={false}>
                                {openMenu === 'jobs' && (
                                    <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }} className='overflow-hidden'>
                                        <NavLink to="/admin/jobs" end className={({isActive})=>`flex items-center p-2 sm:pl-12 gap-2 w-full hover:bg-gray-100 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                                            <i className="fa-solid fa-list text-sm"></i>
                                            <span className="text-sm max-sm:hidden">All Jobs</span>
                                        </NavLink>
                                        <NavLink to="/admin/jobs/create" className={({isActive})=>`flex items-center p-2 sm:pl-12 gap-2 w-full hover:bg-gray-100 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                                            <i className="fa-solid fa-plus text-sm"></i>
                                            <span className="text-sm max-sm:hidden">Add Job</span>
                                        </NavLink>
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </li>

                        <li>
                            <button onClick={() => toggleMenu('companies')} className={`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 cursor-pointer ${openMenu === 'companies' && 'bg-blue-100 border-r-4 border-blue-500 font-semibold'}`}>
                                <i className="fa-solid fa-house text-lg"></i>
                                <span className="text-sm max-sm:hidden">Manage Company</span>
                                <motion.i className="fa-solid fa-chevron-down text-xs ml-auto max-sm:hidden" animate={{ rotate: openMenu === 'companies' ? 180 : 0 }} transition={{ duration: 0.25 }} />
                            </button>
                            <AnimatePresence initial={false}>
                                {openMenu === 'companies' && (
                                    <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }} className='overflow-hidden'>
                                        <NavLink to="/admin/companies" end className={({isActive})=>`flex items-center p-2 sm:pl-12 gap-2 w-full hover:bg-gray-100 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                                            <i className="fa-solid fa-list text-sm"></i>
                                            <span className="text-sm max-sm:hidden">All Companies</span>
                                        </NavLink>
                                        <NavLink to="/admin/companies/create" className={({isActive})=>`flex items-center p-2 sm:pl-12 gap-2 w-full hover:bg-gray-100 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                                            <i className="fa-solid fa-plus text-sm"></i>
                                            <span className="text-sm max-sm:hidden">Add Company</span>
                                        </NavLink>
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </li>

                        <NavLink to="/admin/applications" className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500 font-semibold'}`}>
                            <i className="fa-solid fa-folder-open text-lg"></i>
                            <span className="text-sm max-sm:hidden">View Applications</span>
                        </NavLink>
                    </ul>
                </div>

                <div className='flex-1 p-2 sm:p-8 bg-white'>
                    <Outlet /> 
                </div>
            </div>
        </div>
    )
}

export default Dashboard