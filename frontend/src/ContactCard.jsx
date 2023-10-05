import React from 'react';

const ContactCard = ({ contact, onDelete }) => {
  const handleDeleteClick = () => {
    const shouldDelete = window.confirm(`Are you sure you want to delete ${contact.name}?`);
    if (shouldDelete) {
      onDelete(contact);
    }
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
