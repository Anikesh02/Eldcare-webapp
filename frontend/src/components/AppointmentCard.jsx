import React from 'react';
import './AppointmentCard.css'; // Import the CSS file

const AppointmentCard = ({ appointment, onCancel }) => {
  return (
    <div className="appointment-card">
      <div className="card-content">
        <img className="profile-image" src={appointment.profileImage} alt="Profile" />
        <div className="appointment-info">
          <h3 className="hospital-name">{appointment.hospitalName}</h3>
          <p className="time-slot">Time Slot: {appointment.timeSlot}</p>
          <p className="contact-number">Contact: {appointment.contactNumber}</p>
          <button className="cancel-button" onClick={onCancel}>
            Cancel Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
