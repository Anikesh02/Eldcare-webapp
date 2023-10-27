import React, { useState, useEffect } from 'react';
import AppointmentCard from './AppointmentCard';
import appointmentsData from '../data/appointments';
import { useUser } from '../UserContext';
import { getAppointmentData } from '../firebase';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState(appointmentsData);

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user['uid']);

  useEffect(() => {
    getAppointmentData(user.uid)
      .then((data) => {
        console.log(data);
        setAppointments(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.uid]);

  const cancelAppointment = (id) => {
    // Filter out the appointment with the given ID
    const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
    setAppointments(updatedAppointments);
  };

  // useEffect(() => {
  //   setAppointments(appointments);
  // }, [appointments]);

  return (
    <div className="bg-gray-200 p-4">
      <div className="appointments-container">
        {appointments.map(appointment => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onCancel={() => cancelAppointment(appointment.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;
