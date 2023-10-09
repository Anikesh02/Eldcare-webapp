// src/components/Appointments.jsx
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
    <div className="Appointments mb-5">
      <h2 className='heading '>Upcoming Appointments</h2>
      <ul className='mb-5'>
        {appointmentList.map((appointment, index) => (
          <li className='mb-3' key={index}>
            {appointment}
            <button onClick={() => handleDoneClick(index)}>✔️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
