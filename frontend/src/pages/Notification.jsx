import React from 'react';
import Medicines from '../components/Medicines';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Appointments from '../components/Appointments';

const Notification = () => {
  const appointments = ['Doctor Appointment on Oct 10', 'Dentist Appointment on Oct 15'];
  const medicines = ['Take Painkiller at 9 AM', 'Take Blood Pressure Medicine at 7 PM'];

  const notify = (message) => {
    toast(message);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
   

      {/* Your Notifications heading */}
      <div className="max-w-3xl mx-auto p-4 mt-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Your Notifications</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Appointments</h2>
            <Appointments appointments={appointments} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Medicines</h2>
            <Medicines medicines={medicines} />
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Notification;
