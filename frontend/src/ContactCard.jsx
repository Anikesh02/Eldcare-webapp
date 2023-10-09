import React from 'react';
import {IoCallSharp} from "react-icons/io5" 
import {AiFillDelete} from "react-icons/ai"



const ContactCard = ({ contact, onDelete }) => {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(rgb(56, 189, 248), rgb(186, 230, 253))',
  };

  return (
    <div className="contact-card">
      <img src={contact.image} alt={contact.name} />
      <h2 className='text-2xl mb-2 font-bold'>{contact.name}</h2>
      <button className='call-btn mb-3' onClick={() => console.log(`Calling ${contact.name} at ${contact.phoneNumber}`)}>
        Call
      </button>
      <button className='delete-btn' onClick={handleDeleteClick}>Delete Contact</button>
    </div>
  );
};

export default ContactCard;
