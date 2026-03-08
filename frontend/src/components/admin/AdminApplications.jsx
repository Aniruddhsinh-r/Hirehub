import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { APPLICATION_API_ENDPOINT } from '../../utils/constant'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AdminApplications = () => {
    const [applications, setApplications] = useState([])
    const [open, setOpen] = useState(null)
    const shortlistingStatus = ["accepted", "rejected"]
    const navigate = useNavigate()

    const statusHandler = async (status, app) => {
    try {
        const res = await axios.post(
            `${APPLICATION_API_ENDPOINT}/status/${app._id}/update`,
            { status },
            { withCredentials: true }
        );

        if (res.data.success) {
            toast.success(res.data.message);
            setApplications(prev =>
                prev.map(a =>
                    a._id === app._id ? { ...a, status: status.toLowerCase() } : a
                )
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
        } else {
            toast.error(res.data.message || "Failed to update status");
        }

    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update status");
    }
};

    useEffect(() => {
        const fetchRecruiterApplications = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_ENDPOINT}/recruiter/get`,
                    { withCredentials: true }
                )
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
        <div>
            <h1 className="font-bold text-2xl mb-5">All Applications</h1>
            <table className="w-full border-collapse mt-6">
                <thead className="bg-gray-200">
                    <tr className="border-b border-gray-300">
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Full Name</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Job Title</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Company</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Resume</th>
                        {/* <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Date</th> */}
                        <th className="px-6 py-3 text-sm font-bold text-black text-right tracking-wide">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.length > 0 ? (
                        applications.map((app) => (
                            <tr key={app._id} className="border-b border-gray-300 hover:bg-gray-50 transition-colors">
                                <td className="px-2 py-1 text-sm text-gray-800 border-r border-gray-200 font-medium">{app?.applicant?.fullname}</td>
                                <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200 font-medium">{app?.applicant?.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200 font-medium">{app?.job?.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200 font-medium">{app?.company?.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200 font-medium">
                                    {app?.applicant?.profile?.resume
                                        ? <a target="_blank" href={app.applicant.profile.resume} className="text-blue-600 underline">{app.applicant.profile.resumeOriginalName || "View"}</a>
                                        : <span>NA</span>}
                                </td>
                                {/* <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200 font-medium">{new Date(app.createdAt).toLocaleDateString()}</td> */}
                                {/* <td className="px-6 py-4 text-sm border-r border-gray-200">
                                    {app.status === "pending" ? <button onClick={() => setOpen(open === app._id ? null : app._id)} className="w-full">...</button> : 
                                    <span className={`px-3 py-1 rounded-full font-medium ${app.status === "rejected" ? "bg-red-200 text-red-800" : app.status === "accepted" ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}>
                                        {app.status || "Pending"}
                                    </span>}
                                </td> */}
                                <td className="relative text-gray-800 font-medium px-6 py-3 text-sm border-r border-gray-200 flex items-center justify-center">
                                    {app.status === "pending" ? <button onClick={() => setOpen(open === app._id ? null : app._id)} className="w-full text-xl"><i class="fa-solid fa-ellipsis"></i></button> : 
                                    <span className={`px-3 py-1 rounded-full font-medium ${app.status === "rejected" ? "bg-red-200 text-red-800" : app.status === "accepted" ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}>
                                        {app.status || "Pending"}
                                    </span>}
                                    {open === app._id && (
                                        <div className="absolute right-0 top-10 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                            {shortlistingStatus.map((status, index) => (
                                                <div key={index} onClick={() => { statusHandler(status, app); setOpen(null); }} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                                                    {status}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center py-6 text-gray-500">
                                No applications received yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AdminApplications