import axios from 'axios'
import React, { useEffect } from 'react'
import { COMPANY_API_ENDPOINT } from '../../utils/constant'
import { useDispatch } from 'react-redux'
import { setCompanies } from '../../redux/companySlice'

const GetAllCompanies = () => {
  const dispatch = useDispatch()
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`,{withCredentials: true});
                console.log("API RESPONSE:", res.data);
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[])
}

export default GetAllCompanies
