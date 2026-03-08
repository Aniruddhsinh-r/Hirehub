import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { COMPANY_API_ENDPOINT } from '../../utils/constant'
import { useSelector } from 'react-redux'
import store from '../../redux/store'
import { Loader2 } from 'lucide-react'
import GetCompanyById from '../hooks/GetCompanyById'

const CompanySetup = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm()

    const params = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    // const {singleCompany} = useSelector(store => store.company)
    const singleCompany = useSelector(state => state.company?.singleCompany)
    GetCompanyById(params.id)

    useEffect(() => {
        if (singleCompany) {
            reset({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
            });
        }
    }, [singleCompany, reset]);

    const onSubmit = async (data) => {
        // console.log("Company Data:", data)
        try {
            setLoading(true)
            const formData = new FormData()

            formData.append("name", data.name)
            formData.append("description", data.description)
            formData.append("website", data.website)
            formData.append("location", data.location)
            if (data.logo && data.logo.length > 0) {
                formData.append("file", data.logo[0])
            }

            const res = await axios.put(`${COMPANY_API_ENDPOINT}/update/${params.id}`, formData , {
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials: true
            })
            
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/companies")
            }
        } catch (error) {
            console.log(error);
            toast(error.response.data.message)
            navigate("admin/companies")
        }  finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-5 sm:p-8">

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Company Setup</h2>
                    <p className="text-gray-500 mt-1">Update your company details and branding information.</p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block font-medium mb-2">Company Name</label>
                        <input type="text" {...register("name", {
                            required: "Company name is required"
                            , minLength: { value: 3, message: "Minimum 3 characters required" }
                            , maxLength: { value: 50, message: "Maximum 50 characters allowd" }})} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="Enter company name" />
                        {errors.name && (
                            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Website</label>
                        <input type="url" {...register("website", {required: "Website is required"
                            ,pattern: {value: /^(https?:\/\/)/
                            ,message: "Website must start with http:// or https://"}})} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="https://example.com" />
                        {errors.website && (
                            <p className="text-sm text-red-600 mt-1">{errors.website.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Location</label>
                        <input type="text" {...register("location", {required: "Location is required"})} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="City, Country" />
                        {errors.location && (
                            <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Company Logo</label>
                        <input type="file" {...register("logo",{required: "Company logo is required"})} className="border border-gray-400 w-full font-medium text-gray-700 rounded-md shadow-xs cursor-pointer file:bg-gray-700 file:text-white file:px-4 file:py-2 file:rounded-l-md file:border-0" />
                        {errors.logo && (
                            <p className="text-sm text-red-600 mt-1">{errors.logo.message}</p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block font-medium mb-2">Description</label>
                        <textarea rows="4" {...register("description", {
                            required: "Description is required",
                            maxLength: {value: 300,message:"Max 300 characters allowed"}})} className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="Write a short description about your company..." ></textarea>
                        {errors.description && (
                            <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <button type="reset" className="px-6 py-2 rounded-md border cursor-pointer border-gray-400 text-gray-700 font-medium hover:bg-gray-100" >Cancel</button>
                        <button type="submit" className="px-6 py-2 cursor-pointer rounded-md bg-gray-800 text-white font-medium hover:bg-gray-900">{ loading ? <span className='flex'><Loader2 className="m-1 h-4 w-4 animate-spin "/>Please Wait</span>  : "Save Changes"}</button>
                    </div>
                </form>

                {/* Buttons */}
                {/* <div className="flex justify-end gap-3 mt-8">
                    <button className="px-6 py-2 rounded-md border border-gray-400 text-gray-700 font-medium hover:bg-gray-100">Cancel</button>
                    <button className="px-6 py-2 rounded-md bg-gray-800 text-white font-medium hover:bg-gray-900">Save Changes</button>
                </div> */}

            </div>
        </div>
    )
}

export default CompanySetup