import React, { useState } from 'react';
import AppointmentCard from './AppointmentCard';
import appointmentsData from '../data/appointments';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState(appointmentsData);

  const cancelAppointment = (id) => {
    // Filter out the appointment with the given ID
    const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
    setAppointments(updatedAppointments);
  };

  return (
    <div className="appointments-container">
      {appointments.map(appointment => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          onCancel={() => cancelAppointment(appointment.id)}
        />
      ))}
    </div>
  );
};

export default AppointmentsList;
