# Eldcare-webapp
#ContactApp.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import ContactCard from './ContactCard';
import { useUser } from './UserContext';
import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

function ContactApp() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phoneNumber: '', image: '' });
  const { user, updateUser } = useUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL, email } = user;
        updateUser({ uid, name: displayName, photoURL, email });
      } else {
        updateUser(null);
      }
    });
    return () => unsubscribe();
  }, [updateUser]);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(savedContacts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setNewContact({ ...newContact, image: event.target.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addContact = () => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);

    localStorage.setItem('contacts', JSON.stringify(updatedContacts));

    setNewContact({ name: '', phoneNumber: '', image: '' });
  };

  const deleteContact = (contactToDelete) => {
    const updatedContacts = contacts.filter((contact) => contact !== contactToDelete);

    localStorage.setItem('contacts', JSON.stringify(updatedContacts));

    setContacts(updatedContacts);
  };

  return (
    <section className="bg-gray-200 min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-9 text-center">
          Hello, <span className="text-blue-500">{user?.name ? user.name : 'User'}</span>
        </h1>
        <div className="flex flex-col items-center mt-3">
          <div className="flex flex-wrap items-center mb-3">
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={newContact.name}
              onChange={handleInputChange}
              className="py-2 px-4 rounded-lg border border-gray-300 mb-2 placeholder-gray-500 w-full sm:w-auto"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={newContact.phoneNumber}
              onChange={handleInputChange}
              className="py-2 px-4 rounded-lg border border-gray-300 mb-2 placeholder-gray-500 w-full sm:w-auto"
            />
            <label className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg ml-2 cursor-pointer mb-2">
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg ml-2 mb-2"
              onClick={addContact}
            >
              Add Contact
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <ContactCard key={index} contact={contact} onDelete={deleteContact} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactApp;


#ContactCard.jsx

import React from 'react';
import {IoCallSharp} from "react-icons/io5" 
import {AiFillDelete} from "react-icons/ai"



const ContactCard = ({ contact, onDelete }) => {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(rgb(56, 189, 248), rgb(186, 230, 253))',
  };

  return (
    <div className="flex flex-col items-center rounded-lg shadow-lg m-6 w-64" style={gradientStyle}>
      <img
        src={contact.image}
        alt={`${contact.name}'s avatar`}
        className="w-32 h-32 rounded-full mb-2 mt-4"  // Adjusted margin-top (mt-4)
      />
      <div className="text-xl font-bold mb-2">{contact.name}</div>
      <div className="text-gray-600 mb-4">{contact.phoneNumber}</div>
      <div className="flex justify-between w-full p-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white py-5 px-6 rounded-lg mr-4"
          onClick={() => onDelete(contact)}
        >
          <AiFillDelete />
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white py-5 px-16 rounded-lg">
        <IoCallSharp />
          
        </button>
       
      </div>
    </div>
  );
};

export default ContactCard;


#AppointmentCard.jsx


import React from 'react';

const AppointmentCard = ({ appointment, onCancel }) => {
  return (
    
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-blue-200 via-blue-300 to-yellow-100 p-4 rounded-lg mb-4 shadow-md mx-auto max-w-lg  ">

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


#Notification.jsx
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


#Remainder.jsx

import React, { useState, useEffect } from 'react';

function Reminder() {
  const [reminders, setReminders] = useState([]);
  const [text, setText] = useState('');
  const [time, setTime] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const addReminder = () => {
    if (text.trim() === '' || time.trim() === '') return;

    const reminderTime = new Date(time);

    if (isNaN(reminderTime.getTime())) {
      alert('Invalid time format. Please enter a valid time (e.g., "2023-10-10T12:00").');
      return;
    }

    setReminders([...reminders, { text, time: reminderTime }]);
    setText('');
    setTime('');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();

      reminders.forEach((reminder, index) => {
        if (reminder.time <= currentTime) {
          alert(`Reminder: ${reminder.text}`);

          const updatedReminders = [...reminders];
          updatedReminders.splice(index, 1);
          setReminders(updatedReminders);
        }
      });
    }, 1000); // Check every second

    return () => clearInterval(timer);
  }, [reminders]);

  return (
    <div className="bg-gray-200 min-h-screen p-6">
      <h1 className="text-3xl font-semibold mb-7 text-center">Reminder App</h1>
      <div className="flex">
        <input
          type="text"
          className="border p-2 rounded-l mr-2 w-full"
          placeholder="Add a reminder..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="datetime-local"
          className="border p-2 rounded-r"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r"
          onClick={addReminder}
        >
          Add
        </button>
      </div>
      <ul className="mt-4">
        {reminders.map((reminder, index) => (
          <li key={index} className={`py-2 ${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}`}>
            {`${reminder.text} - ${reminder.time.toLocaleString()}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reminder;



#Contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <section className="bg-blue-100 py-10">
      <div className="container mx-auto max-w-screen-md px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <p className="text-lg font-light text-center mb-12">
          Got a technical issue? Want to send feedback about a beta feature? Let us know.
        </p>
        <form className="space-y-8">
          <div>
            <label htmlFor="email" className="block font-semibold mb-1 text-gray-700">Your Email</label>
            <input type="email" id="email" placeholder="example@gmail.com" className="w-full p-2 rounded border border-gray-300 placeholder-gray-400" />
          </div>

          <div>
            <label htmlFor="subject" className="block font-semibold mb-1 text-gray-700">Subject</label>
            <input type="text" id="subject" placeholder="Let us know how we can help you" className="w-full p-2 rounded border border-gray-300 placeholder-gray-400" />
          </div>

          <div className="col-span-2">
            <label htmlFor="message" className="block font-semibold mb-1 text-gray-700">Your Message</label>
            <textarea rows={5} type="text" id="message" placeholder="Leave a comment..." className="w-full p-2 rounded border border-gray-300 placeholder-gray-400"></textarea>
          </div>
          <button type="submit" className="btn w-auto py-2 px-6 rounded bg-blue-500 text-white hover:bg-blue-700">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

