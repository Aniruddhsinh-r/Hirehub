import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_ENDPOINT } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../../redux/JobSlice'

const JobboardJobs = () => {
    const dispatch= useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`,{withCredentials: true});
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[dispatch, searchedQuery])
}

export default JobboardJobs
