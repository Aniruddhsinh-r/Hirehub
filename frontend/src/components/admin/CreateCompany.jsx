import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_ENDPOINT } from '../../utils/constant'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../../redux/companySlice'

const CreateCompany = () => {
    const navigate = useNavigate()
    const [companyName, setcompanyName] = useState()
    const dispatch = useDispatch()

    const registerCompany = async () =>{ 
        try {
            const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`,{companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials: true
            })
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            navigate(`/admin/companies`)
        }
    }
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-5 sm:p-8">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-0.5">Create Company</h2>
        <p className='font-medium mb-6 text-gray-500'>What would you like to gove your company name? You canchange it later.</p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
          <input type="text" placeholder="Enter company name" className="border border-gray-400 w-full p-2 font-medium text-gray-700 rounded-md shadow-xs" onChange={(e) => setcompanyName(e.target.value)}/>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="w-full cursor-pointer sm:w-24 py-2 rounded-md border border-gray-400 font-medium text-gray-700 hover:bg-gray-100">Cancel</button>
          <button className="w-full sm:w-24 py-2 cursor-pointer rounded-md bg-gray-800 text-white font-medium hover:bg-gray-900" onClick={registerCompany}>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default CreateCompany