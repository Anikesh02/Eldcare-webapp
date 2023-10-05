// src/components/Medicines.jsx
import React, { useState } from 'react';
import './Medicines.css';

const Medicines = ({ medicines }) => {
  const [medicineList, setMedicineList] = useState(medicines);

  const handleDoneClick = (index) => {
    const updatedMedicines = [...medicineList];
    updatedMedicines.splice(index, 1);
    setMedicineList(updatedMedicines);
  };

  return (
    <div className="Medicines mb-5">
      <h2 className='heading'>Daily Medicines</h2>
      <ul>
        {medicineList.map((medicine, index) => (
          <li className='mb-3' key={index}>
            {medicine}
            <button onClick={() => handleDoneClick(index)}>✔️ </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Medicines;
