import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { APPLICATION_API_ENDPOINT } from '../../utils/constant'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '../../redux/applicationSlice'
import { setSelectedUser } from '../../redux/chatSlice' // Added for messaging
import { toast } from 'react-toastify'

const Applicants = () => {
    const [open, setOpen] = useState(null)
    const shortlistingStatus = ["Accepted", "Rejected"]
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { applicants } = useSelector(store => store.application)

    // Chat functionality
    const handleMessageApplicant = (app) => {
        const applicant = app?.applicant
        if (!applicant) return
        dispatch(setSelectedUser({
            _id: applicant._id,
            fullname: applicant.fullname,
            email: applicant.email,
            role: applicant.role,
            profile: applicant.profile
        }))
        navigate(`/messages/${applicant._id}`)
    }

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, { status: status.toLowerCase() }, {
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                // Optionally: Refetch or update local state if needed
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating status")
        }
    }

    useEffect(() => {
        const fetchAllApplications = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setApplicants(res.data.job.applications))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplications()
    }, [params.id, dispatch])

    return (
        <div className="max-w-7xl mx-auto my-10 px-4">
            <h1 className="font-bold text-2xl mb-5 text-gray-800">Total Job Applicants ({applicants?.length || 0})</h1>

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="w-full text-left border-collapse bg-white">
                    <thead className="bg-[#f1f3f5] border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-[13px] font-bold text-gray-700 tracking-wider">Applicant</th>
                            <th className="px-6 py-4 text-[13px] font-bold text-gray-700 tracking-wider">Resume</th>
                            <th className="px-6 py-4 text-[13px] font-bold text-gray-700 tracking-wider">Submitted Date</th>
                            <th className="px-6 py-4 text-[13px] font-bold text-gray-700 tracking-wider text-center">Status</th>
                            <th className="px-6 py-4 text-[13px] font-bold text-gray-700 tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {applicants && applicants.length > 0 ? (
                            applicants.map((app, index) => (
                                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                    {/* Applicant Info */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-blue-600 cursor-pointer hover:underline">
                                                {app?.applicant?.fullname}
                                            </span>
                                            <span className="text-[12px] text-gray-500 mt-0.5 font-medium">
                                                {app?.applicant?.phoneNo} | {app?.applicant?.email}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-sm font-medium">
                                        {app?.applicant?.profile?.resume ? (
                                            <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={app.applicant.profile.resume}
                                                className="text-blue-600 underline font-bold"
                                            >
                                                {app.applicant.profile.resumeOriginalName || "View Resume"}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 font-bold">NA</span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(app.createdAt).toLocaleDateString('en-GB')}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-4 py-1 rounded-full text-[12px] font-medium capitalize 
                                            ${app.status === "rejected" ? "bg-red-100 text-red-700 border border-red-200" :
                                                app.status === "accepted" ? "bg-green-100 text-green-700 border border-green-200" :
                                                    "bg-gray-100 text-gray-600 border border-gray-200"}`}>
                                            {app.status || "Pending"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-right relative overflow-visible">
                                        <div className="inline-block relative">
                                            <button onClick={() => setOpen(open === index ? null : index)} className="text-gray-400 hover:text-gray-800 transition-all p-1 focus:outline-none"><i className="fa-solid fa-ellipsis text-xl tracking-tighter"></i></button>

                                            {open === index && (
                                                <>
                                                    <div className="fixed inset-0 z-10" onClick={() => setOpen(null)} />
                                                    <div className="absolute right-1/2 translate-x-1/2 mt-2 w-44 bg-white border border-gray-100 rounded-[22px] shadow-2xl z-50 py-2 ring-1 ring-black/5 animate-in fade-in zoom-in duration-100">
                                                        <div className="flex flex-col items-center w-full">
                                                            {shortlistingStatus.map((status, sIdx) => (
                                                                <div key={sIdx} onClick={() => { statusHandler(status, app._id); setOpen(null); }} className="w-full text-center px-4 py-2.5 text-[14px] font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 cursor-pointer capitalize transition-all">{status}</div>
                                                            ))}
                                                            <div className="w-full border-t border-gray-100 pt-1.5 mt-1.5 flex flex-col items-center">
                                                                <div onClick={() => { handleMessageApplicant(app); setOpen(null); }} className="w-full text-center px-4 py-2.5 text-[14px] font-bold text-blue-600 hover:bg-blue-50 cursor-pointer transition-all rounded-b-[22px]">Message</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-20 text-gray-400 font-medium italic">
                                    No applicants for this job yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Applicants