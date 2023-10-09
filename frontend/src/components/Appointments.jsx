import React, { useState } from 'react';
import './Appointments.css';

const Appointments = ({ appointments }) => {
  const [appointmentList, setAppointmentList] = useState(appointments);

  const handleDoneClick = (index) => {
    const updatedAppointments = [...appointmentList];
    updatedAppointments.splice(index, 1);
    setAppointmentList(updatedAppointments);
  };

  return (
    <div className="Appointments bg-blue-200 p-4 rounded-lg shadow-lg mb-5">
      <h2 className='heading text-lg font-bold mb-4'>Upcoming Appointments</h2>
      <ul>
        {appointmentList.map((appointment, index) => (
          <li className='flex justify-between items-center mb-3' key={index}>
            <span className='text-lg'>{appointment}</span>
            <button onClick={() => handleDoneClick(index)} className='text-green-500 ml-2'>
              ✔️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
