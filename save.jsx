import React, { useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { APPLICATION_API_ENDPOINT } from '../../utils/constant'
import { toast } from 'react-toastify'

const Email = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    interviewDate: "",
    interviewTime: "",
    companyAddress: "",
    message: ""
  })

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/interview/${id}`,
        formData,
        { withCredentials: true }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/admin/applications")
      }

    } catch (error) {
      toast.error("Failed to send mail")
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* LEFT SIDE FORM */}
      <div className="bg-white p-8 shadow-lg rounded-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Send Interview Invitation
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">

          <div>
            <label className="block font-medium mb-1">Interview Date</label>
            <input
              type="date"
              name="interviewDate"
              required
              onChange={changeHandler}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Interview Time</label>
            <input
              type="time"
              name="interviewTime"
              required
              onChange={changeHandler}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Company Address</label>
            <input
              type="text"
              name="companyAddress"
              placeholder="Enter full address"
              required
              onChange={changeHandler}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Additional Message</label>
            <textarea
              name="message"
              rows="4"
              placeholder="Write instructions for candidate..."
              onChange={changeHandler}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Send Interview Mail
          </button>

        </form>
      </div>


      {/* RIGHT SIDE PROFESSIONAL EMAIL FORMAT */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner">

        <div className="bg-white p-8 rounded-lg shadow-md text-sm leading-6">

          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
            Interview Invitation
          </h2>

          <p>Dear <strong>Candidate Name</strong>,</p>

          <p className="mt-3">
            Congratulations! You have been shortlisted for the position at 
            <strong> Your Company</strong>.
          </p>

          <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-md mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">
              Interview Details
            </h3>

            <p><strong>Date:</strong> {formData.interviewDate || "DD/MM/YYYY"}</p>
            <p><strong>Time:</strong> {formData.interviewTime || "HH:MM"}</p>
            <p><strong>Location:</strong> {formData.companyAddress || "Company Address"}</p>
          </div>

          {formData.message && (
            <p className="mt-10">
              {formData.message}
            </p>
          )}

          <p className="mt-8">
            Best Regards,<br />
            <strong>Your Company</strong><br />
            {formData.companyAddress || "Company Address"}
          </p>

          <hr className="mt-8" />
          <p className="text-gray-400 text-xs mt-2">
            This email was sent via HireHub Recruitment System.
          </p>

        </div>

      </div>

    </div>
  )
}

export default Email