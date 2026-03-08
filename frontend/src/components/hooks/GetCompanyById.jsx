import axios from 'axios'
import React, { useEffect } from 'react'
import { COMPANY_API_ENDPOINT } from '../../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '../../redux/JobSlice'
import { setSingleCompany } from '../../redux/companySlice'

const GetCompanyById = (companyId) => {
  const dispatch = useDispatch()
    useEffect(()=>{
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`,{withCredentials: true});
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany();
    },[companyId, dispatch])
}

export default GetCompanyById
