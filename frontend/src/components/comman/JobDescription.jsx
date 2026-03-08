import React, { useEffect, useState } from 'react'
import { Calendar, MapPin, Briefcase, Users, DollarSign, Clock, User, } from 'lucide-react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '../../utils/constant';
import { setSingleJob } from '../../redux/JobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react'; // Add ArrowLeft
import { useNavigate } from 'react-router-dom';

const JobDescription = () => {
    // Data extracted from your image
    // const jobDetails = {
    //     title: "Frontend Developer",
    //     positions: "12 Positions",
    //     type: "Part Time",
    //     salaryBadge: "24LPA",
    //     location: "Hyderabad",
    //     experience: "2 yrs",
    //     salary: "12LPA",
    //     totalApplicants: 4,
    //     postedDate: "17-07-2024",
    //     description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium similique sed dolor! Architecto, hic quasi. Atque, facilis. Voluptatum, facilis.",
    // };

    const params = useParams()
    const jobId = params.id;
    const dispatch = useDispatch()
    const {singleJob} = useSelector(store=>store.job)
    const {user} = useSelector(store=>store.auth)
    const isApplyed = singleJob?.applications?.some(applications=>applications.applicant == user?._id) || false
    const [isApplied, setisApplied] = useState(isApplyed)
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`,{withCredentials: true})
            if (res.data.success) {
                setisApplied(true)
                const updateJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updateJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    // setisApplied(res.data.job.applications.some(application=>application.applicant == user?._id))
                    if (user) {
                    const alreadyApplied = res.data.job.applications.some(
                        application => application.applicant === user?._id
                    );
                    setisApplied(alreadyApplied);
                } else {
                    // If no user, they haven't applied!
                    setisApplied(false); 
                }
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id])

    return (
        <div>
            <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-6 md:px-8 border-b border-gray-100 bg-white">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{singleJob?.title}</h1>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">{singleJob?.position} Position</span>
                                    <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold border border-orange-100">{singleJob?.jobType}</span>
                                    <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold border border-purple-100">{singleJob?.salary}</span>
                                </div>
                            </div>
                            <button disabled={isApplied} className={`px-8 py-3 rounded-xl font-semibold shadow-md transition-all whitespace-nowrap cursor-pointer ${isApplied ? "bg-gray-400 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#62089d] text-white"}`} onClick={isApplied ? null : applyJobHandler}>{isApplied ? "Already Applied" : "Apply"}</button>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><Briefcase size={20} className="text-[#76ada9]" />Job Description</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-12">
                            {/* Left Column: Details List */}
                            <div className="space-y-3">
                                <DetailItem icon={<Briefcase size={18} />} label="Role" value={singleJob?.title} />
                                <DetailItem icon={<MapPin size={18} />} label="Location" value={singleJob?.location} />
                                <DetailItem icon={<Clock size={18} />} label="Experience" value={singleJob?.experienceLevel} />
                                <DetailItem icon={<DollarSign size={18} />} label="Salary" value={singleJob?.salary} />
                                <DetailItem icon={<Users size={18} />} label="Total Applicants" value={singleJob?.applications?.length} />
                                <DetailItem icon={<Calendar size={18} />} label="Posted Date" value={singleJob?.createdAt?.split("T")[0]} />
                            </div>

                            {/* Right Column: Text Description */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 md:col-span-2">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">About the role</h3>
                                <p className="text-gray-700 leading-relaxed italic">{singleJob?.description}</p>
                            </div>
                            <button onClick={() => navigate("/Jobs")} className="flex items-center gap-2 text-purple-600 hover:text-[#7209b7] font-semibold transition-all group cursor-pointer">
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />Back to Jobs
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 group">
        <div className="p-2 bg-gray-100 rounded-lg text-gray-500 group-hover:bg-[#76ada9] group-hover:text-white transition-colors">{icon}</div>
        <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-tight">{label}</p>
            <p className="text-gray-900 font-medium">{value}</p>
        </div>
    </div>
);

export default JobDescription 