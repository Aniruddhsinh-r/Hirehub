import React, { useState } from 'react'
import Navbar from '../Navbar'
import { useForm } from "react-hook-form"
import "./Signin.css"
import { USER_API_ENDPOINT } from '../../utils/constant'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice'
import store from '../../redux/store'
import {Loader2} from 'lucide-react'
import Footer from '../Footer'

const Signin = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm()

    const [isActive, setIsActive] = useState(true);
    const {loading} = useSelector(store=>store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const onSubmit = async (data) => {
        try {
            dispatch(setLoading(true))
            const formData = new FormData()

            formData.append("fullname", data.fullname)
            formData.append("email", data.email)
            formData.append("phoneNo", data.phoneNo)
            formData.append("password", data.password)
            formData.append("role", data.role)
            if (data.profilePic && data.profilePic.length > 0) {
                formData.append("file", data.profilePic[0])
            }

            const res = await axios.post(`${USER_API_ENDPOINT}/register`,formData,
                {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                // navigate("/")
                setIsActive(!isActive)
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    const loginForm = useForm()
    const onLoginSubmit = async (data) => {

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_ENDPOINT}/login`,{
                email: data.Loginemail,
                password: data.Loginpassword,
                role: data.Loginrole,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            },   
        )
        if (res.data.success) {
            dispatch(setUser(res.data.user))
            navigate("/")
            toast.success(res.data.message);
        }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }


    return (
        <div>
            <Navbar />
            <div className="h-full flex items-center justify-center px-4 py-8">
                <div id='container' className={`relative overflow-hidden w-full max-w-250 h-auto md:h-155 bg-white rounded-[30px] shadow-2xl flex ${isActive ? 'active' : ''}`}>
                    <div id='SigninSection' className={`log-in-panel absolute top-0 left-0 w-full md:w-1/2 h-full transition-all duration-700 ease-in-out flex flex-col justify-center py-6 px-5 min-[400px]:px-10 ${isActive ? 'max-md:hidden' : 'block'}`}>
                        <h2 className="text-3xl font-bold text-black my-4">Sign Up</h2>

                        <form action="" method="post" className='space-y-4.5' onSubmit={handleSubmit(onSubmit)}>
                            <div className='space-y-0.5'>
                                <label htmlFor="Name" className="block font-medium">Full Name</label>
                                <input type="text" {...register("fullname", {required: {value:true, message:"Please enter your full name"}
                                    ,maxLength: {value:40, message:"Full name cannot exceed 40 characters"}
                                    ,minLength: {value:5, message:"Full name must be at least 5 characters long"}
                                    ,pattern: {value:/^[a-zA-Z]+(?: [a-zA-Z]+)+$/, message: "Please enter only letters and single spaces",}})} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="User Name" />
                                <div className='red'>{errors.fullname?.message}</div>
                            </div>

                            <div className='space-y-0.5'>
                                <label htmlFor="email" className="block font-medium">Your email</label>
                                <input type="email" {...register("email", {required: {value:true, message:"Please enter your email address"}
                                ,maxLength: {value:250, message:"email cannot exceed 250 characters"}
                                ,pattern: {value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message:"Please enter a valid email address"}})} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="name@gmail.com" />
                                <div className='red'>{errors.email?.message}</div>
                            </div>

                            <div className='space-y-0.5'>
                                <label htmlFor="phoneNo" className="block font-medium">Phone Number</label>
                                <input type="text" {...register("phoneNo", {required: {value:true, message:"Please enter your phone number"}
                                ,maxLength: {value:10, message:"Phone number must be only 10 character long"}
                                ,minLength: {value:10, message:"Phone number must be 10 character long"}})} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="Phone Number" onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))} />
                                <div className='red'>{errors.phoneNo?.message}</div>
                            </div>

                            <div className='space-y-0.5'>
                                <label htmlFor="password" className="block font-medium">Password</label>
                                <input type="password" {...register("password", {required: {value:true, message:"Please enter your password"}
                                ,maxLength: {value:50, message:"password cannot exceed 50 characters"}
                                ,minLength: {value:5, message:"password must be at least 5 characters long"}})} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="Password" />
                                <div className='red'>{errors.password?.message}</div>
                            </div>

                            <div className='space-y-0.5'>
                                <label htmlFor="profilePic" className="block font-medium">Profile Pic</label>
                                <input type="file" {...register("profilePic", {required: {value:true, message:"Please select your profile picture"}})} className="border border-gray-400 w-full font-medium text-gray-700 rounded-md shadow-xs cursor-pointer file:bg-gray-700 file:text-white file:px-4 file:py-2 file:rounded-l-md file:border-0" placeholder="Profile Pic" />
                                <div className='red'>{errors.file?.message}</div>
                            </div>

                            <div className='items-center space-y-0.5'>
                                <div className='items-center gap-4 w-full max-w-md'>
                                    <label htmlFor="Roal" className="font-medium">Roal :</label>
                                    <label htmlFor="Jookseeker" className="ml-3 font-medium"><input type="radio" value="jobseeker" {...register("role", {required:"Please select Role"})} /> Joobseeker</label>
                                    <label htmlFor="Recruiter" className="ml-3 font-medium"><input type="radio" value="recruiter" {...register("role", {required:"Please select Role"})} /> Recruiter</label>
                                </div>
                                <div className='red'>{errors.role?.message}</div>
                            </div>
                            
                            <button type="submit" className='border border-gray-400 w-full mt-2 px-8 py-2 font-medium rounded-md shadow-xs text-white bg-gray-800 hover:bg-gray-900'>{ loading ? <Loader2 className="m-2 h-4 w-4 animate-spin "/> : "Sign Up"}</button>
                            <p className="md:hidden text-sm mt-4 text-gray-600 hover:underline cursor-pointer" onClick={() => setIsActive(true)}>← Already have account</p>
                            {errors.root && (<p className="text-red-600 font-medium">{errors.root.message}</p>)}
                        </form>
                    </div>

                    <div id='LoginSection' className={`sign-in-panel md:block w-full md:w-1/2 md:mt-12 absolute top-0 left-0 h-full transition-all duration-700 ease-in-out flex flex-col justify-center p-5 min-[400px]:p-10 ${!isActive ? 'max-md:hidden' : 'block'}`}>
                        <h2 className="text-3xl font-bold text-black py-3 mb-6">Log in</h2>

                        <form action="" method="post" className='space-y-6' onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                            <div className='space-y-2'>
                                <label htmlFor="email" className="block font-medium">Your email</label>
                                <input type="email" {...loginForm.register("Loginemail", {required: {value:true, message:"Please enter your email address"}
                                ,maxLength: {value:250, message:"email cannot exceed 250 characters"}
                                ,minLength: {value:5, message:"email must be at least 12 characters long"}
                                ,pattern: {value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message:"Enter your correct email address"}})} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="name@flowbite.com" />
                                <div className='red'>{loginForm.formState.errors.Loginemail?.message}</div>
                            </div>

                            <div className='space-y-2'>
                                <label htmlFor="Loginpassword" className="block font-medium">Password</label>
                                <input type="password" {...loginForm.register("Loginpassword", {required: {value:true, message:"Please enter your password"}
                                ,maxLength: {value:50, message:"password cannot exceed 50 characters"}
                                ,minLength: {value:5, message:"password must be at least 5 characters long"}})} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="password" />
                                <div className='red'>{loginForm.formState.errors.Loginpassword?.message}</div>
                            </div>

                            <div className='gap-3 my-8'>
                                <div className='gap-4 w-full max-w-md'>
                                    <label htmlFor="Roal" className="font-medium">Roal :</label>
                                    <label htmlFor="Jookseeker" className="ml-3 font-medium"><input type="radio" value="jobseeker" {...loginForm.register("Loginrole", {required:"Please select Role"})}/> Joobseeker</label>
                                    <label htmlFor="Recruiter" className="ml-3 font-medium"><input type="radio" value="recruiter" {...loginForm.register("Loginrole", {required:"Please select Role"})} /> Recruiter</label>
                                </div>
                                <div className='red'>{loginForm.formState.errors.Loginrole?.message}</div>
                            </div>
                            <button type="submit" className='border border-gray-400 w-full mt-2 px-8 py-2 font-medium rounded-md shadow-xs text-white bg-gray-800 hover:bg-gray-900'>{ loading ? <Loader2 className="m-2 h-4 w-4 animate-spin "/> : "Login"}</button>
                        </form>
                        <p className="md:hidden text-sm mt-4 text-gray-600 hover:underline" onClick={()=>{setIsActive(false)}}>&larr; Already have account</p>
                    </div>

                    <div className="toggle-container max-[767px]:hidden absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out rounded-[100px_0_0_100px] z-50">
                        <div className="toggle">
                            <div className="toggle-left absolute w-1/2 h-full flex items-center justify-center flex-col px-7 text-center top-0 transition-all duration-700 ease-in-out">
                                <h1 className="text-2xl font-bold mb-4">Hello, Friend!</h1>
                                <p className="mb-8 text-sm">Register with your personal details to use all of site features</p>
                                <button onClick={() => setIsActive(false)} className="border-2 border-white px-12 py-2 rounded-lg font-bold uppercase cursor-pointer hover:bg-white hover:text-indigo-600 transition">Log In</button>
                            </div>
                            <div className="toggle-right toggle-panel absolute w-1/2 h-full flex items-center justify-center flex-col px-7 text-center top-0 transition-all duration-700 ease-in-out">
                                <h1 className="text-2xl font-bold mb-4">Welcome Back!</h1>
                                <p className="mb-8 text-sm">Enter your personal details to use all of site features</p>
                                <button onClick={() => setIsActive(true)} className="border-2 border-white px-12 py-2 rounded-lg font-bold uppercase cursor-pointer hover:bg-white hover:text-indigo-600 transition">Sign In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Signin