import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { APPLICATION_API_ENDPOINT } from '../../utils/constant'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSelectedUser } from '../../redux/chatSlice'

const AdminApplications = () => {
    const [applications, setApplications] = useState([])
    const [open, setOpen] = useState(null)
    const shortlistingStatus = ["Accepted", "Rejected"]
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    const statusHandler = async (status, app) => {
        try {
            const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${app._id}/update`, { status: status.toLowerCase() }, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                setApplications(prev =>
                    prev.map(a => a._id === app._id ? { ...a, status: status.toLowerCase() } : a)
                );
                if (status.toLowerCase() === "accepted") {
                    navigate(`/admin/email/${app._id}`, {
                        state: {
                            candidateName: app?.applicant?.fullname,
                            companyName: app?.company?.name,
                            jobTitle: app?.job?.title,
                        },
                    });
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    useEffect(() => {
        const fetchRecruiterApplications = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/recruiter/get`, { withCredentials: true })
                if (res.data.success) {
                    setApplications(res.data.applications)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchRecruiterApplications()
    }, [])

    return (
        <div className="max-w-7xl mx-auto my-10 px-4">
            <h1 className="font-bold text-2xl mb-5 text-gray-800">All Applications</h1>

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="w-full text-left border-collapse bg-white">
                    <thead className="bg-[#f1f3f5] border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-[13px] font-bold text-gray-700 tracking-wider">Applicant</th>
                            <th className="px-6 py-4 text-[13px] font-bold text-gray-700 tracking-wider">Job Title</th>
                            <th className="px-6 py-4 text-[13px] font-bold text-gray-700 tracking-wider">Company</th>
                            <th className="px-6 py-4 text-[13px] font-bold text-gray-700 tracking-wider text-center">Resume</th>
                            <th className="px-6 py-4 text-[13px] font-bold text-gray-700 tracking-wider text-center">Status</th>
                            <th className="px-6 py-4 text-[13px] font-bold text-gray-700 tracking-wider text-right">Action</th>
                            <th className="px-6 py-4 text-[13px] font-bold text-gray-700 tracking-wider">Submitted</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {applications.length > 0 ? (
                            applications.map((app) => (
                                <tr key={app._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-blue-600 cursor-pointer hover:underline">
                                                {app?.applicant?.fullname}
                                            </span>
                                            <span className="text-[12px] text-gray-500 mt-0.5 font-medium">
                                                {app?.applicant?.phoneNo} | {app?.applicant?.email || "No Email"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-700 font-medium">{app?.job?.title}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">{app?.company?.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-100 font-medium">
                                        {app?.applicant?.profile?.resume
                                            ? <a target="_blank" rel="noreferrer" href="{app.applicant.profile.resume}" className="text-blue-600 underline font-bold">{app.applicant.profile.resumeOriginalName || "View Resume"}</a>
                                            : <span className="text-gray-400">NA</span>}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-4 py-1 rounded-full text-[12px] font-medium capitalize 
                                            ${app.status === "rejected" ? "bg-red-100 text-red-700 border border-red-200" :
                                                app.status === "accepted" ? "bg-green-100 text-green-700 border border-green-200" :
                                                    "bg-gray-100 text-gray-600 border border-gray-200"}`}>
                                            {app.status || "Pending"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right relative">
                                        <button onClick={() => setOpen(open === app._id ? null : app._id)} className="text-gray-400 hover:text-gray-800 transition p-1">
                                            <i className="fa-solid fa-ellipsis text-lg"></i>
                                        </button>

                                        {open === app._id && (
                                            <div className="absolute right-6 top-10 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">

                                                {shortlistingStatus.map((status, index) => (
                                                    <div key={index} onClick={() => { statusHandler(status, app); setOpen(null); }} className="px-4 py-2 text-[13.5px] text-gray-700  font-medium tracking-wide capitalize  hover:bg-gray-100 cursor-pointer text-center">{status}</div>
                                                ))}
                                                <div className="border-t border-gray-200"></div>
                                        
                                                <div onClick={() => { handleMessageApplicant(app); setOpen(null); }} className="px-4 py-2 text-[14px]  font-semibold tracking-wide  text-gray-900  cursor-pointer text-center hover:bg-gray-100">Message</div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">{new Date(app.createdAt).toLocaleDateString()}</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-20 text-gray-400 font-medium italic">No applications available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminApplications