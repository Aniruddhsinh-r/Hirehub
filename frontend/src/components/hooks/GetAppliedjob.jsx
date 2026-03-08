import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { APPLICATION_API_ENDPOINT } from '../../utils/constant'
import { setAllAppliedJbos } from '../../redux/JobSlice'

const GetAppliedjob = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAppliedJbos(res.data.application));
                }
            } catch (error) {
                console.log("Error fetching applied jobs:", error);
            }
        };
        fetchAppliedJobs();
    }, [dispatch]);
}

export default GetAppliedjob;