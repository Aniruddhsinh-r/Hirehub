import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { APPLICATION_API_ENDPOINT } from '../../utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '../../redux/applicationSlice'
import { toast } from 'react-toastify'

const Applicants = () => {
    const [open, setopen] = useState(null)
    const shortlistingStatus = ["accepted", "Rejected"]
    const params = useParams()
    const dispatch = useDispatch()
    const { applicants } = useSelector(store => store.application)

    const statusHandler = async (status,id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`,{status},{
                withCredentials:true
            })
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
        const fetchAllApplications = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, { withCredentials: true })
                dispatch(setApplicants(res.data.job.applications))
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplications()
    }, [])

    return (
        <div>
            <table className="w-full border-collapse mt-6">
                <thead className="bg-gray-200">
                    <tr className="border-b border-gray-300">
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Full Name</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Contact</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Resume</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Date</th>
                        <th className="px-6 py-3 text-sm font-bold text-black border-r border-gray-200 text-right tracking-wide">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    applicants?.map((app, index) => (
                    <tr key={index} className="border-b border-gray-300 hover:bg-gray-50 transition-colors">
                        <td className="w-[20%] px-2 py-1 text-sm text-gray-800 border-r border-gray-200 font-medium">{app?.applicant?.fullname}</td>
                        <td className="w-[20%] px-6 py-4 text-sm text-gray-800 border-r border-gray-200 font-medium">{app?.applicant?.email}</td>
                        <td className="w-[15%] px-6 py-4 text-sm text-gray-800 border-r border-gray-200 font-medium">{app?.applicant?.phoneNo}</td>
                        <td className="w-[20%] px-6 py-4 text-sm text-gray-800 border-r border-gray-200 font-medium">{app?.applicant?.profile?.resume ? <a target='_blank' href={app?.applicant?.profile?.resume}>{app?.applicant?.profile?.resumeOriginalName}</a> : <p>NA</p>}</td>
                        <td className="w-[15%] px-6 py-4 text-sm text-gray-800 border-r border-gray-200 font-medium">{new Date(app.createdAt).toLocaleDateString()}</td>
                        <td className="w-[10%] relative text-gray-800 border-r border-gray-200 font-medium">
                            <button onClick={() => setopen(open === 1 ? null : 1)} className='w-full h-12'>...</button>

                            {/* POPOVER */}
                            {open === 1 && (
                                <div className="absolute right-0 top-10 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    {shortlistingStatus.map((status, index) => (
                                        <div key={index} onClick={()=>{statusHandler(status,app._id)}}  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><span  onClick={() => { console.log(status); setopen(null) }}> {status} </span></div>
                                    ))}
                                </div>
                            )}
                        </td>
                    </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Applicants