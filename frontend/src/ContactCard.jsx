import React from 'react';
import {FiPhoneCall} from "react-icons/fi" 
import {AiFillDelete} from "react-icons/ai"


const ContactCard = ({ contact, onDelete }) => {

  
  const gradientStyle = {
    backgroundImage: 'linear-gradient(rgb(56, 189, 248), rgb(186, 230, 253))',
    
  };

  return (
    <div className="flex flex-col items-center rounded-lg shadow-lg m-11 w-74" style={gradientStyle}>
      <img
        src={contact.image}
        alt={`${contact.name}'s avatar`}
        className="w-32 h-32 rounded-full mb-2 mt-4"  
      />
      <div className="text-xl font-bold mb-2">{contact.name}</div>
      <div className="text-gray-600 mb-4">{contact.phoneNumber}</div>
      <div className="flex justify-between w-full p-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white py-5 px-6 rounded-lg mr-8"
          onClick={() => onDelete(contact)}
        >
          <AiFillDelete /> 
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white py-5 px-16 rounded-lg"  onClick={() => console.log(`Calling ${contact.name} at ${contact.phoneNumber}`)}>
        <FiPhoneCall />
          
        </button>
       
      </div>
    </div>
  );
};

export default ContactCard;