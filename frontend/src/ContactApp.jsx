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
        console.log("Hello" + user.uid);
        localStorage.setItem('user', JSON.stringify(user));
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
