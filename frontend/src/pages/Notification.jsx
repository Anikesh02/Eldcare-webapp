import React from 'react'
// import { services } from '../assets/data/services'
// import ServiceCard from '../components/Services/ServiceCard'
// import NotificationPage from '../components/NotificationPage';
import '../App.css';

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
    <div className="App">
      <Appointments appointments={appointments} />
      <Medicines medicines={medicines} />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
  
}

export default Notification