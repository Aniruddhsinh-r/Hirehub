import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Signin from './components/authentication/Signin'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Contact from './components/Contact'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Jobs } from './components/Jobs'
import About from './components/About'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/comman/JobDescription'
import Companies from './components/admin/Companies.jsx'
import Dashboard from './components/admin/Dashboard.jsx'
import AddJobs from './components/admin/AddJobs.jsx'
import CreateCompany from './components/admin/CreateCompany.jsx'
import CompanySetup from './components/admin/CompanySetup.jsx'
import PostJob from './components/admin/PostJob.jsx'
import Applicants from './components/admin/Applicants.jsx'
import { AnimatePresence } from "motion/react"
import { useLocation } from "react-router-dom"
import PageAnimationWrapper from './components/comman/PageAnimationWrapper .jsx'
import SavedJobsPage from './components/SavedJobs.jsx'
import AdminApplications from './components/admin/AdminApplications.jsx'
import Email from './components/admin/Email.jsx'
import ProtectRoute from './components/admin/ProtectRoute.jsx'
import AppliedJob from './components/AppliedJob.jsx'
import Messages from './components/Messages.jsx'

function App() {
  const [count, setCount] = useState(0)
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <></>
    },
    {
      path: '/Home',
      element: <Home />,
      errorElement: <></>
    },
    {
      path: '/Signin',
      element: <Signin />,
      errorElement: <></>
    },
    {
      path: '/Jobs',
      element: <Jobs />,
      errorElement: <></>
    },
    {
      path: '/About',
      element: <About />,
      errorElement: <></>
    },
    {
      path: '/Browse',
      element: <Browse />,
      errorElement: <></>
    },
    {
      path: '/Contact',
      element: <Contact />,
      errorElement: <></>
    },
    {
      path: '/Description/:id',
      element: (
        <PageAnimationWrapper>
          <JobDescription />
        </PageAnimationWrapper>
      ),
      errorElement: <></>
    },
    {
      path: '/profile',
      element: <Profile />,
      errorElement: <></>
    },
    {
      path: '/SavedJob',
      element: <SavedJobsPage />,
      errorElement: <></>
    },
    {
      path: '/AppliedJobs',
      element: <AppliedJob />,
      errorElement: <></>
    },
    {
      path: 'messages/:id',
      element: <Messages />,
    },
    { 
      path: '/admin',
      element: <ProtectRoute><Dashboard /></ProtectRoute>,
      children: [
        { 
          index: true,
          element: <Companies />
        },
        {
          path: 'jobs',
          element: <AddJobs />,
        },
        {
          path: 'jobs/create',
          element: <PostJob />,
        },
        {
          path: 'companies',
          element: <Companies />,
        },
        {
          path: 'applications',
          element: <AdminApplications />,
        },
        {
          path: 'companies/create',
          element: <CreateCompany />,
        },
        {
          path: 'companies/:id', 
          element: <CompanySetup />,
        },
        {
          path: 'jobs/:id/applicants',
          element: <Applicants />,
        },
        {
          path: 'email/:id',
          element: <Email />,
        },
      ]
    }
  ])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
