import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { USER_API_ENDPOINT } from "../utils/constant";

const UpdateProfileModal = ({ open, setopen }) => {
  if (!open) return null;
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false)
  const { user } = useSelector(store => store.auth)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: user?.fullname,
      email: user?.email,
      phoneNo: user?.phoneNo,
      bio: user?.profile?.bio,
      skills: user?.profile?.skills?.join(", "),
      file: user?.profile?.resume
    },
  })

  const onSubmit = async (data) => {
    try {
      setloading(true)
      const formData = new FormData()

      formData.append("fullname", data.fullname)
      formData.append("email", data.email)
      formData.append("phoneNo", data.phoneNo)
      formData.append("bio", data.bio)
      formData.append("skills", data.skills)
      if (data.file?.length > 0) {
        formData.append("file", data.file[0])
      }

      const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message);
        setopen(false)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setopen(false)
    }
  }

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg relative p-6">
          <button onClick={() => setopen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-black">✕</button>

          <h2 className="text-lg font-semibold mb-6">Update Profile</h2>
          <form action="" method="post" className="space-y-4 text-sm" onSubmit={handleSubmit(onSubmit)}>

            <div className="flex items-center gap-1 flex-wrap">
              <label className="w-15 font-medium">Name</label>
              <input type="text" {...register("fullname", {
                required: { value: true, message: "Please enter your full name" }
                , maxLength: { value: 40, message: "Full name cannot exceed 40 characters" }
                , minLength: { value: 5, message: "Full name must be at least 5 characters long" }
                , pattern: { value: /^[a-zA-Z]+(?: [a-zA-Z]+)+$/, message: "Please enter only letters and single spaces", }
              })} className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400" />
              <div className='red ml-16 mb-1'>{errors.fullname?.message}</div>
            </div>

            <div className="flex items-center gap-1 flex-wrap">
              <label className="w-15 font-medium">Email</label>
              <input type="email" {...register("email", {
                required: { value: true, message: "Please enter your email address" }
                , maxLength: { value: 250, message: "email cannot exceed 250 characters" }
                , pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address" }
              })} className="flex-1 border rounded-md px-3 py-2" />
              <div className='red ml-16 mb-1'>{errors.email?.message}</div>
            </div>

            <div className="flex items-center gap-1 flex-wrap">
              <label className="w-15 font-medium">Number</label>
              <input type="text" {...register("phoneNo", {
                required: { value: true, message: "Please enter your phone number" }
                , maxLength: { value: 10, message: "Phone number must be only 10 character long" }
                , minLength: { value: 10, message: "Phone number must be 10 character long" }
              })} className="flex-1 border rounded-md px-3 py-2" />
              <div className='red ml-16 mb-1'>{errors.phoneNo?.message}</div>
            </div>

            <div className="flex items-center gap-1 flex-wrap">
              <label className="w-15 font-medium">Bio</label>
              <input type="text" {...register("bio", {  
                maxLength: { value: 500, message: "bio must be only 500 character long" }
              })} className="flex-1 border rounded-md px-3 py-2" />
              <div className='red ml-16 mb-1'>{errors.bio?.message}</div>
            </div>

            <div className="flex items-center gap-1 flex-wrap">
              <label className="w-15 font-medium">Skills</label>
              <input type="text" {...register("skills", {
                maxLength: { value: 500, message: "Phone number must be only 10 character long" }
              })} className="flex-1 border rounded-md px-3 py-2" />
              <div className='red ml-16 mb-1'>{errors.skills?.message}</div>
            </div>

            <div className="flex items-center gap-1 flex-wrap">
              <label className="w-15 font-medium">Resume</label>
              <input type="file" {...register("file", { required: { value: true, message: "Please select your Resume" } })} className="flex-1 text-sm" />
              <div className='red ml-17'>{errors.file?.message}</div>
            </div>

            <button type="submit" className="w-full mt-6 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition">{loading ? <Loader2 className="m-2 h-4 w-4 animate-spin " /> : "Update"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
