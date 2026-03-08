import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../../redux/JobSlice";

const Category = () => {
    const categories = [
        "Frontend Developer",
        "Backend Developer",
        "Data Science",
        "Graphic Designer",
        "Fullstack Developer",
    ];

    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            left: -200,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: 200,
            behavior: "smooth",
        });
    };

     const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleJobSearch = (query) => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    return (
        <div className="max-w-xl w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-3 bg-white">

            <button onClick={scrollLeft} className="p-2 rounded-full border hover:bg-gray-100 transition shrink-0">
                <FaChevronLeft />
            </button>

            <div ref={scrollRef} className="flex flex-1 gap-4 sm:gap-8 md:gap-16 overflow-x-auto scrollbar-hide scroll-smooth" >
                {categories.map((item, index) => (
                    <button key={index} onClick={()=>{handleJobSearch(item)}} className="whitespace-nowrap px-4 sm:px-5  py-2 rounded-full border text-sm font-medium cursor-pointer hover:bg-black hover:text-white transition">{item}</button>
                ))}
            </div>

            <button onClick={scrollRight} className="p-2 rounded-full border hover:bg-gray-100 transition shrink-0">
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Category;
