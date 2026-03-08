import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import GetAllCompanies from '../hooks/GetAllCompanies'
import { useDispatch } from 'react-redux'
import { searchCompanyByText } from '../../redux/companySlice'

const Companies = () => {
  GetAllCompanies();
  const navigation = useNavigate()
  const [input, setinput] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(searchCompanyByText(input))
  }, [input])
  
  return (
    <div>
      <h1 className='font-bold text-2xl mb-5'>Company Management</h1>
      <div className='max-w-6xl mx-auto my-10 px-8'>
        <div className='flex justify-between'>
          <input type="text" className="border border-gray-400 w-80 h-11 p-2 font-medium text-gray-700 rounded-md shadow-xs" placeholder="Company detail" onChange={(e)=>setinput(e.target.value)}/>
          <button className='border border-gray-400 px-8 py-2 font-medium rounded-md shadow-xs text-white bg-gray-800 cursor-pointer hover:bg-gray-900' onClick={() => { navigation("/admin/companies/create") }}>Add Company</button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  )
}

export default Companies