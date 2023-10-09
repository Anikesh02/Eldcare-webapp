import './app.css';
import Layout from './layout/Layout';
import ContactCard from './ContactCard';
import { useState } from 'react';


function App() {

  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phoneNumber: '', image: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const addContact = () => {
    setContacts([...contacts, newContact]);
    setNewContact({ name: '', phoneNumber: '', image: '' });
  };



  return(
    
      <Layout/>

  ) 
 
}

export default App
