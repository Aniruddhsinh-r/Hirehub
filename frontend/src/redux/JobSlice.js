import { createSlice } from "@reduxjs/toolkit"

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs: [],
        adminJobs: [],
        singleJob: null, 
        searchJobByText:"",
        allAppliedJobs: [],
        searchedQuery:"",
    },
    reducers:{
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action) => {
            state.adminJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJbos:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        },
    }
})

export const {setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJbos, setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;