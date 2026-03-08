import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {

  const { user } = useSelector(store => store.auth);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-300 shadow-md text-gray-800 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">

          {/* Left Branding */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold text-green-900">
              HireHub Dashboard
            </h2>
            <p className="text-sm text-gray-700">
              Find jobs & hire talent efficiently
            </p>
          </div>

          {/* Nav Links (Same Logic As Navbar) */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm font-medium">

            {
              user && user.role === "recruiter" ? (
                <>
                  <Link to="/admin/jobs" className="hover:text-green-900 transition">
                    Jobs
                  </Link>

                  <Link to="/admin/companies" className="hover:text-green-900 transition">
                    Companies
                  </Link>

                  <Link to="/" className="hover:text-green-900 transition">
                    View Site
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/Home" className="hover:text-green-900 transition">
                    Home
                  </Link>

                  <Link to="/Jobs" className="hover:text-green-900 transition">
                    Jobboard
                  </Link>

                  <Link to="/About" className="hover:text-green-900 transition">
                    About
                  </Link>

                  <Link to="/Contact" className="hover:text-green-900 transition">
                    Contact
                  </Link>
                </>
              )
            }

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-200 my-4"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center text-sm text-gray-700">

          <p>
            © {year} <span className="font-semibold">HireHub</span>. All rights reserved.
          </p>

          <p>
            Developed by{" "}
            <span className="text-green-900 font-semibold">
              Aniruddhsinh
            </span>
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
