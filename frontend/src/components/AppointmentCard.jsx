import React from 'react';

const AppointmentCard = ({ appointment, onCancel }) => {
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-blue-200 via-blue-300 to-yellow-100 p-4 rounded-lg mb-4 shadow-md mx-auto max-w-lg">
      <img className="w-20 h-20 md:w-12 md:h-12 rounded-full mb-4 md:mb-0 md:mr-4" src={appointment.profileImage} alt="Profile" />
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold mb-2">{appointment.hospitalName}</h3>
          <p className="text-gray-700 text-sm mb-2">Time Slot: {appointment.timeSlot}</p>
          <p className="text-gray-700 text-sm">Contact: {appointment.contactNumber}</p>
        </div>
        <button
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg mt-2 text-sm"
          onClick={onCancel}
        >
          Cancel Appointment
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;