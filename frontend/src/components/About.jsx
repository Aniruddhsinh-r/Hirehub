import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { Users, Target, Globe, Rocket } from "lucide-react";
import Footer from "./Footer";

const teamMembers = [
  {
    name: "Aniruddhsinh Rathod",
    role: "CEO & Founder",
    image: "/founder1.jpg",
    description:
      "Visionary leader driving product innovation, strategy, and overall company growth.",
  },
  {
    name: "Mukesh Patil",
    role: "Dalal",
    image: "/founder2.jpg",
    description:
      "Handles operations, team coordination, and ensures project delivery timelines.",
  },
  {
    name: "Miraj Saikh",
    role: "Head Manager",
    image: "/founder3.jpg",
    description:
      "Works on development, support, and helps improve product quality daily.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Navbar />
      
      <section className="px-6 md:px-16 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold tracking-tight">
          About Our Platform
        </motion.h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">We are building a modern job and career platform focused on connecting talented people with the right opportunities. Our mission is to make hiring simple, fast and transparent for everyone.</p>
      </section>

      <section className="px-6 md:px-16 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
            <Globe className="mx-auto p-2 rounded-xl mb-4 bg-purple-100 text-purple-600" size={60} />
            <h3 className="text-xl font-semibold mb-3">Global Vision</h3>
            <p className="text-gray-600">Our goal is to create a global platform where companies and job seekers can connect without barriers.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
            <Target className="mx-auto p-2 rounded-xl mb-4 text-green-600 bg-gray-100" size={60} />
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600">To simplify recruitment and provide powerful tools for companies and candidates.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
            <Rocket className="mx-auto p-2 rounded-xl mb-4 bg-blue-100 text-blue-600" size={60} />
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-gray-600">We use modern technologies to build fast, secure and scalable applications.</p>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-[#768282] text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Our Mission to Empower Careers</h1>
          <p className="text-lg md:text-xl text-purple-100 leading-relaxed">We are more than just a job board. We are a bridge between dreams and reality, designed to simplify the hiring process for both employers and job seekers.</p>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-6 p-12">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 text-gray-900">
            Meet Our Core Team
          </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -12 }}
              className="relative bg-white rounded-3xl shadow-xl p-8 text-center group border border-gray-100 hover:shadow-2xl transition duration-500"
            >
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-purple-50 via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition duration-500"></div>
              
              <div className="relative w-40 h-40 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500 to-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition"></div>
                <img src={member.image} alt={member.name} className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-105 transition duration-500" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-purple-600 font-semibold mt-2 text-lg">{member.role}</p>
              <p className="text-gray-600 text-sm mt-4 leading-relaxed max-w-xs mx-auto">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-2 px-4 md:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Our Platform?</h2>
        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p>Our platform is designed with both employers and job seekers in mind. We provide an intuitive interface, fast search capabilities, and secure authentication. Our system ensures reliable job postings and verified  <strong>company profiles.</strong></p>
          <p>We continuously improve our system by analyzing user behavior and feedback. Performance optimization, security upgrades and UI improvements are part of our regular development cycle. Our vision is to become one of the most trusted recruitment platforms by delivering transparency, performance and reliability.</p>
        </div>
      </section>

      <Footer/>
    </div>
  );
}
