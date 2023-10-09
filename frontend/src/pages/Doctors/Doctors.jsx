import React from 'react'
import DoctorCard from './../../components/Doctors/DoctorCard'
import {doctors} from './../../assets/data/doctors'
import Testimonial from '../../components/Testimonials/Testimonial'
import AppointmentsList from '../../components/AppointmentsList'


const Doctors = () => {
  return  <>
  <section className='bg-[#fff9ea]'>
    <div className="container text-center">
      <h2 className='heading'>Your Appointments</h2>
      
      {/* <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
        <input type="search" className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor" placeholder="Search by Hospital/specialization/service" />
        <button className='btn mt-0 rounded-[0px] rounded-r-md'>Search</button>
      </div> */}
    </div>
    
  </section>
  <AppointmentsList />
  
  </>
  
}

export default Doctors