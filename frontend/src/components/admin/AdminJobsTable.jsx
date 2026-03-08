import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const [open, setopen] = useState(null)
    const adminJobs = useSelector(state => state.job?.adminJobs ?? [])
    const searchJobByText = useSelector(state => state.job?.searchJobByText ?? "")
    const [filterJobs, setfilterJobs] = useState(adminJobs)
    const navigate = useNavigate()

    useEffect(() => {
        const filteredJob = adminJobs.length >= 0 && adminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            }
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            )
        })
        setfilterJobs(filteredJob)
    }, [adminJobs, searchJobByText])
    return (
        <div>
            <table className="w-full border-collapse mt-6">
                <thead className="bg-gray-200">
                    <tr className="border-b border-gray-300">
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Company Name</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Role</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Date</th>
                        <th className="px-6 py-3 text-sm font-bold text-black border-r border-gray-200 text-right tracking-wide">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        adminJobs.length <= 0 ? <span>No job posted with this account.</span> : filterJobs?.map((job) => {
                            return (
                                <tr className="border-b border-gray-300 hover:bg-gray-50 transition-colors" key={job._id}>
                                    <td className="w-[15%] px-2 py-1 text-sm text-gray-800 border-r border-gray-200 font-medium">{job?.company?.name}</td>
                                    <td className="w-[35%] px-6 py-4 text-sm text-gray-800 border-r border-gray-200 font-medium">{job?.title}</td>
                                    <td className="w-[25%] px-6 py-4 text-sm text-gray-800 border-r border-gray-200 font-medium">{job.createdAt.split("T")[0]}</td>
                                    <td className="w-[25%] relative text-2xl text-gray-800 border-r border-gray-200 font-medium"><button className='w-full h-12' onClick={() => { setopen(open === job._id ? null : job._id) }}>...</button>
                                        {
                                            open === job._id && (<div className="absolute right-0 top-12 w-32 py-3 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                                                {/* <button className="flex items-center gap-3 w-full px-4 text-left text-gray-700 hover:bg-green-50" onClick={() => { navigate(`/admin/create/${job._id}`) }}><i className="fa-solid fa-pen text-sm"></i><span className="text-sm font-medium">Edit</span></button> */}
                                                <button className="flex items-center gap-3 w-full px-4 pt-3 text-left text-gray-700 hover:bg-green-50" onClick={() => { navigate(`/admin/jobs/${job._id}/applicants`) }}><i class="fa-solid fa-eye text-sm"></i><span className="text-sm font-medium">Applicants</span></button>
                                            </div>
                                            )
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default AdminJobsTable