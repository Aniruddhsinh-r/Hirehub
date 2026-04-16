import { useSelector } from 'react-redux';
import GetAppliedjob from './hooks/GetAppliedjob'
import Navbar from './Navbar'

const AppliedJob = () => {
    GetAppliedjob();  // triggers the fetch on mount
    const { allAppliedJobs } = useSelector(store => store.job)
    return (
        <div>
            <div className="p-4 md:p-8 flex justify-center">
                <div className="w-full max-w-6xl rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-[#76ada9] text-white px-6 py-4 text-xl font-semibold">Total Applied Jobs</div>

                    <div className="overflow-x-auto p-4">
                        <table className="w-full border-collapse rounded-2xl">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="px-6 py-4 text-left text-sm font-bold text-black border-r border-gray-200">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-black border-r border-gray-200">Job Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-black border-r border-gray-200">COMPANY</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-black border-r border-gray-200">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allAppliedJobs && allAppliedJobs.length > 0 ? (
                                    allAppliedJobs.map((appliedJob) => (
                                    <tr key={appliedJob.id} className="border-b border-gray-300 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200">{appliedJob.createdAt.split("T")[0]}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200 font-medium">{appliedJob?.job?.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200">{appliedJob.job.company.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200"><span className={`px-3 py-1 rounded-full font-medium ${appliedJob.status?.toLowerCase() === "rejected" ? "bg-red-200 text-red-800" : appliedJob.status?.toLowerCase() === "accepted" ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}>{appliedJob.status || "Pending"}</span></td>
                                    </tr>
                                 ))
                                ) : ( 
                                    <tr>
                                        <td colSpan="4" className="text-center py-6 text-gray-500">
                                            You haven't applied to any jobs yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppliedJob