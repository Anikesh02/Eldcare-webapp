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

  console.log(user);
  console.log(user?.name);

  // Load contacts from localStorage when the app starts
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

    // Save contacts to localStorage
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));

    setNewContact({ name: '', phoneNumber: '', image: '' });
  };

  const deleteContact = (contactToDelete) => {
    const updatedContacts = contacts.filter((contact) => contact !== contactToDelete);

    // Save updated contacts to localStorage
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));

    setContacts(updatedContacts);
  };

  return (
  <section>
    <div className="container ">
      <h1 className='heading  mb-9 text-center'>Hello, {user?.name ? user.name : 'User'}</h1>
      
      <div className="contact-form ml-[60px] mt-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newContact.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          className='mb-3'
          name="phoneNumber"
          placeholder="Phone Number"
          value={newContact.phoneNumber}
          onChange={handleInputChange}
        />
        <input
          type="file"
          
          accept="image/*"
          name="image"
          onChange={handleImageUpload}
        />
        <button className='btn ml-[120px] mt-3' onClick={addContact}>Add Contact</button>
      </div>
      <div className="contact-list">
        {contacts.map((contact, index) => (
          <ContactCard key={index} contact={contact} onDelete={deleteContact} />
        ))}
      </div>
    </div>
   
    </section>
  );
}

export default ContactApp;
