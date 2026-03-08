import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const [open, setopen] = useState(null)
    // const { companies, searchCompanyByText } = useSelector(store => store.company);
    const companies = useSelector(state => state.company?.companies ?? [])
    const searchCompanyByText = useSelector(state => state.company?.searchCompanyByText ?? "")
    const [filtercompany, setfiltercompany] = useState(companies)
    const navigate = useNavigate()

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setfiltercompany(filteredCompany)
    }, [companies, searchCompanyByText])

    return (
        <div>
            <table className="w-full border-collapse mt-6">
                <thead className="bg-gray-200">
                    <tr className="border-b border-gray-300">
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Logo</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-black border-r border-gray-300 tracking-wide">Date</th>
                        <th className="px-6 py-3 text-sm font-bold text-black border-r border-gray-200 text-right tracking-wide">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        companies.length <= 0 ? <span>No company registered with this account.</span> : filtercompany?.map((company) => {
                            return (
                                <tr className="border-b border-gray-300 hover:bg-gray-50 transition-colors" key={company._id}>
                                    <td className="w-[15%] px-2 py-1 text-sm text-gray-800 border-r border-gray-200 font-medium"><img src={company.logo} alt={company.name} className='w-auto h-10' /></td>
                                    <td className="w-[35%] px-6 py-4 text-sm text-gray-800 border-r border-gray-200 font-medium">{company.name}</td>
                                    <td className="w-[25%] px-6 py-4 text-sm text-gray-800 border-r border-gray-200 font-medium">{company.createdAt.split("T")[0]}</td>
                                    <td className="w-[25%] relative text-2xl text-gray-800 border-r border-gray-200 font-medium"><button className='w-full h-12' onClick={() => { setopen(open === company._id ? null : company._id) }}>...</button>
                                        {
                                            open === company._id && (<div className="absolute right-0 top-12 w-40 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                                                <button className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-green-50" onClick={() => { navigate(`/admin/companies/${company._id}`) }}><i className="fa-solid fa-pen text-sm"></i><span className="text-sm font-medium">Edit</span></button>
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

export default CompaniesTable