import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JOB_API_ENDPOINT } from "../../utils/constant";
import { toast } from "react-toastify";
import axios from "axios";

const JobPostForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    // const { companies } = useSelector(store => store.company)
    const companies = useSelector(store => store.company?.companies || [])
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data);
        try {
            setloading(true)

            const res = await axios.post(`${JOB_API_ENDPOINT}/post`, data, {
                withCredentials: true
            })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/jobs")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Backend Error");
        } finally {
            setloading(false)
        }
    };



    return (
        <div>
            <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-5 sm:p-8">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Post Job</h2>
                    <p className="text-gray-500 mt-1">Add new job opening details for candidates.</p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>

                    {/* Job Title */}
                    <div>
                        <label className="block font-medium mb-2">Job Title</label>
                        <input type="text" {...register("title", {
                            required: "Job title is required"
                            , minLength: { value: 3, message: "Minimum 3 characters required" }
                            , maxLength: { value: 50, message: "Maximum 50 characters allowd" }
                        })} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="Frontend Developer" />
                        {errors.title && (<p className="text-sm text-red-600 mt-1">{errors.title.message}</p>)}
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Salary</label>
                        <input type="number" {...register("salary", {
                            required: "Salary is required"
                            , min: { value: 4000, message: "You cant enter less then 4000 rupes" }
                            , max: { value: 10000000, message: "You cant enter more then 1,00,00,000 rupes" }
                        })} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="50000" />
                        {errors.salary && (<p className="text-sm text-red-600 mt-1">{errors.salary.message}</p>)}
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block font-medium mb-2">Location</label>
                        <input type="text" {...register("location", { required: "Location is required" })} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="Surat / Remote"/>
                        {errors.location && (<p className="text-sm text-red-600 mt-1">{errors.location.message}</p>)}
                    </div>

                    {/* Job Type */}
                    <div>
                        <label className="block font-medium mb-2">Job Type</label>
                        <select {...register("jobType", { required: "Job type is required" })} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs">
                            <option value="">Select Job Type</option>
                            <option>Full Time</option>
                            <option>Part Time</option>
                            <option>Internship</option>
                            <option>Contract</option>
                            <option>Remote</option>
                        </select>
                        {errors.jobType && (<p className="text-sm text-red-600 mt-1">{errors.jobType.message}</p>)}
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Experience Level</label>
                        <input type="number" step="1" min="0" max="50"{...register("experience", {
                            required: "Experience is required", valueAsNumber: true
                            , min: { value: 0, message: "Experience cannot be negative" }
                            , max: { value: 50, message: "Experience too large" }})}  className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="Enter Required Experience"/>
                        {errors.experience && (<p className="text-sm text-red-600 mt-1">{errors.experience.message}</p>)}
                    </div>

                    {/* No Of Positions */}
                    <div>
                        <label className="block font-medium mb-2">No Of Positions</label>
                        <input type="number" {...register("position", {
                            required: "Number of positions is required"
                            , minLength: { value: 1, message: "Minimum no of 1 position is must." }
                            , maxLength: { value: 200, message: "Maximum no of position is 200" }
                        })} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="2" />
                        {errors.positions && (<p className="text-sm text-red-600 mt-1">errors.positions.message</p>)}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block font-medium mb-2">Requirements</label>
                        <input type="text" {...register("requirement", {
                            required: "Please enter your Requirements"
                            , maxLength: { value: 100, message: "Maximum 100 characters allowd" }
                        })} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="Frontend Developer" />
                        {errors.title && (<p className="text-sm text-red-600 mt-1">{errors.title.message}</p>)}
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block font-medium mb-2">Description</label>
                        <textarea rows="3"{...register("description", {
                            required: "Description is required"
                            , maxLength: { value: 5000, message: "Max 5000 characters allowed" }
                        })} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="Write job description..." />
                        {errors.description && (<p className="text-sm text-red-600 mt-1">{errors.description.message}</p>)}
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Company</label>
                        <select {...register("companyId", { required: "Company is required" })} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs">
                            <option value="">Select Company</option>

                            {companies?.map((company) => (
                                <option key={company._id} value={company._id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-2 flex justify-end gap-3 mt-6">




                        <button type="reset" onClick={() => reset()} className="px-6 py-2 rounded-md border border-gray-400 text-gray-700 font-medium hover:bg-gray-100">Cancel</button>
                        <button type="submit" className="px-6 py-2 rounded-md bg-gray-800 text-white font-medium hover:bg-gray-900 flex items-center">{loading ? (<span className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</span>) : ("Post Job")}</button>
                        {/* <button type="submit" className="px-6 py-2 cursor-pointer rounded-md bg-gray-800 text-white font-medium hover:bg-gray-900">{ loading ? <span className='flex'><Loader2 className="m-1 h-4 w-4 animate-spin "/>Please Wait</span>  : "Save Changes"}</button> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobPostForm;