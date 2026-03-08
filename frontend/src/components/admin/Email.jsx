import React from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { APPLICATION_API_ENDPOINT } from '../../utils/constant'

const Email = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { candidateName, companyName, jobTitle } = location.state || {}

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      interviewDate: '',
      interviewTime: '',
      companyAddress: '',
      message: '',
    },
  })

  // watch individual fields with fallback default values
  const watchDate = watch('interviewDate') || ''
  const watchTime = watch('interviewTime') || ''
  const watchAddress = watch('companyAddress') || ''
  const watchMessage = watch('message') || ''

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/email/${id}`, {
          date: watchDate,
          time: watchTime,
          address: watchAddress,
          message: watchMessage,
          companyName: companyName,   // send companyName too
        },
        { withCredentials: true }
      )
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/applications')
      }
    } catch (error) {
      toast.error('Failed to send mail')
    }
  }

  // helper to preserve line breaks
  const formatMessage = (msg) =>
    msg.split('\n').map((line, idx) => <span key={idx}>{line}<br /></span>)

  return (
    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LEFT SIDE FORM */}
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Send Interview Invitation</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Interview Date</label>
            <input
              type="date"
              {...register('interviewDate', { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Interview Time</label>
            <input
              type="time"
              {...register('interviewTime', { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Company Address</label>
            <input
              type="text"
              placeholder="Enter full address"
              {...register('companyAddress', { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Additional Message</label>
            <textarea
              rows="4"
              placeholder="Write instructions for candidate..."
              {...register('message')}
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

      {/* RIGHT SIDE EMAIL PREVIEW */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
        <div className="bg-white p-8 rounded-lg shadow-md text-sm leading-6">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Interview Invitation</h2>

          <p>Dear <strong>{candidateName || 'Candidate Name'}</strong>,</p>

          <p className="mt-3">
            Congratulations! You have been shortlisted for the position of <strong>{jobTitle || 'Job Title'}</strong> at <strong>{companyName || 'Company Name'}</strong>.
          </p>

          <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-md mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">Interview Details</h3>
            <p><strong>Date:</strong> {watchDate || 'DD/MM/YYYY'}</p>
            <p><strong>Time:</strong> {watchTime || 'HH:MM'}</p>
            <p><strong>Location:</strong> {watchAddress || 'Company Address'}</p>
          </div>

          {watchMessage && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">Additional Message</h3>
              <p>{formatMessage(watchMessage)}</p>
            </div>
          )}

          <p className="mt-8">
            Best Regards,<br />
            <strong>{companyName || 'Your Company'}</strong><br />
            {watchAddress || 'Company Address'}
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