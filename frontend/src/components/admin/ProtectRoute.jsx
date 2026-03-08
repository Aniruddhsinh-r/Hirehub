import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectRoute = ({children}) => {
    const {user} = useSelector(store => store.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (user === null || user.role !== "recruiter") {
            navigate("/home")
        }
    }, [])

  return (
    <div>{children}</div>
  )
}

export default ProtectRoute