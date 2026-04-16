import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '../../redux/JobSlice'
import { JOB_API_ENDPOINT } from '../../utils/constant'

const GetAllAdminJobs = () => {
  const dispatch = useDispatch()
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`,{withCredentials: true});
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default GetAllAdminJobs