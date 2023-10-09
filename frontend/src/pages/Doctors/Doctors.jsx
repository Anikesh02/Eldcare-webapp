import React from 'react';
import DoctorCard from './../../components/Doctors/DoctorCard';
import { doctors } from './../../assets/data/doctors';
import Testimonial from '../../components/Testimonials/Testimonial';
import AppointmentsList from '../../components/AppointmentsList';

const Doctors = () => {
  return (
    <>
      <section className="">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Appointments</h2>
        </div>
      </section>

      <AppointmentsList />
    </>
  );
};

export default Doctors;
