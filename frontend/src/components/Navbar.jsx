import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { USER_API_ENDPOINT } from '../utils/constant'
import { toast } from "react-toastify";
import { setUser } from "../redux/authSlice";

const Navbar = () => {

    const [Profile, setProfile] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)
    const dispatch = useDispatch()
    const navigat = useNavigate()
    // const user = false;
    const { user } = useSelector(store => store.auth)

    const logoutHandler = async () => {

        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                setProfile(false)
                navigat("/")
                toast.success(res.data.message)

            }
        } catch (error) {
            console.log(error);
            toast.error(res.data.message)
        }
    }

    return (
        <div className="bg-gray-300 shadow-md w-full py-4 font-medium px-8 relative z-50">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className='text-3xl font-bold h-full'>Hire<span className='text-red-500'>Hub</span></div>

                <div className='hidden md:flex items-center gap-8'>
                    {
                        user && user.role == "recruiter" ? (
                            <>
                                {/* <Link to="/admin/dashbord"><ol>Dashbord</ol></Link> */}
                                <Link to="/admin/jobs"><ol>Job</ol></Link>
                                <Link to="/admin/companies"><ol>Companies</ol></Link>
                            </>
                        ) : (
                            <>
                                <Link to="/Home" className="relative group py-1 overflow-hidden">
                                    <span className="text-slate-700 font-bold group-hover:text-black transition-colors duration-300">Home</span>
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 transition-all duration-300 ease-out group-hover:w-full"></span>
                                </Link>
                                <Link to="/Jobs" className="relative group py-1 overflow-hidden">
                                    <span className="text-slate-700 font-bold group-hover:text-black transition-colors duration-300">Jobboard</span>
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 transition-all duration-300 ease-out group-hover:w-full"></span>
                                </Link>
                                <Link to="/About" className="relative group py-1 overflow-hidden">
                                    <span className="text-slate-700 font-bold group-hover:text-black transition-colors duration-300">About</span>
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 transition-all duration-300 ease-out group-hover:w-full"></span>
                                </Link>
                                <Link to="/Contact" className="relative group py-1 overflow-hidden">
                                    <span className="text-slate-700 font-bold group-hover:text-black transition-colors duration-300">Contact</span>
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 transition-all duration-300 ease-out group-hover:w-full"></span>
                                </Link>
                            </>
                        )
                    }

                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden ">
                    <button onClick={() => setMobileMenu(!mobileMenu)} className="flex flex-col gap-1.5">
                        <span className={`h-0.5 w-6 bg-black transition ${mobileMenu ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>

                        <span className={`h-0.5 w-6 bg-black transition ${mobileMenu ? 'opacity-0' : ''}`}></span>
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                        <span className={`h-0.5 w-6 bg-black transition ${mobileMenu ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                    </button>
                </div>

                <div className='relative hidden md:block'>
                    {user ? (
                        <div className='flex items-center'>
                            {user.role !== "recruiter" && (
                                <div className="flex items-center gap-6 mx-7 text-xl">
                                    <Link to="/messages/:id" className="relative group">
                                        <i className="fa-solid fa-message"></i>
                                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                    
                                    <Link to="/SavedJob" className="relative group">
                                        <i className="fa-solid fa-bookmark"></i>
                                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </div>
                            )}

                            <img src={user?.profile?.profilePhoto} alt="ProfilrPic" className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white cursor-pointer hover:ring-2 hover:ring-red-500" onClick={() => { setProfile(!Profile) }} />
                        </div>
                    ) : !user && (
                        <Link to="/Signin"><button className='border-2 border-solid border-black px-4 py-1 my-0.5 rounded-xl bg-gray-800 text-white cursor-pointer duration-300 hover:bg-gray-950'>Sign in</button></Link>
                    )}

                    {Profile && (
                        <div className="absolute right-0 mt-2 w-auto bg-white rounded-md shadow-lg z-50">
                            <div className="flex flex-col">
                                <p className="px-4 py-2 font-medium">{user?.email}</p>
                                {
                                    user && user.role == "recruiter" ? (
                                        <>
                                        </>
                                    ) : (
                                        <button className="px-4 py-2 font-medium hover:bg-gray-100 text-left cursor-pointer"><Link to="/profile"><i class="fa-solid fa-user mr-2"></i> View Profile</Link></button>
                                    )
                                }

                                <button className="px-4 py-2 hover:bg-gray-100 text-left cursor-pointer" onClick={logoutHandler}><i class="fa-solid fa-arrow-right-from-bracket mr-2"></i> Logout</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            {/* Mobile Overlay */}
            <div className={`md:hidden fixed inset-0 bg-black/40 transition-opacity ${mobileMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setMobileMenu(false)}></div>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed top-0 right-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col p-6 gap-6 font-medium">
                    {
                        user && user.role == "recruiter" ? (
                            <>
                                {/* <Link to="/admin/dashbord"><ol>Dashbord</ol></Link> */}
                                <Link to="/admin/jobs"><ol>Job</ol></Link>
                                <Link to="/admin/companice"><ol>Companys</ol></Link>
                            </>
                        ) : (
                            <>
                                <Link to="/Home" onClick={() => setMobileMenu(false)}>Home</Link>
                                <Link to="/Jobs" onClick={() => setMobileMenu(false)}>Jobboard</Link>
                                <Link to="/About" onClick={() => setMobileMenu(false)}>About</Link>
                                <Link to="/Contact" onClick={() => setMobileMenu(false)}>Contact</Link>
                            </>
                        )
                    }
                    <hr />

                    {!user && (
                        <Link to="/Signin" onClick={() => setMobileMenu(false)}>
                            <div className='flex items-center'>
                                <Link className='mx-7 text-xl' to="/SavedJob"><i class="fa-solid fa-bookmark"></i></Link>
                                <img src={user?.profile?.profilePhoto} alt="ProfilrPic" className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white cursor-pointer hover:ring-2 hover:ring-red-500" onClick={() => { setProfile(!Profile) }} />
                            </div>
                            <button className="w-full border-2 border-black py-2 rounded-xl bg-gray-800 text-white">Sign in</button>
                        </Link>
                    )}
                </div>
            </div>

        </div>

    )
}

export default Navbar