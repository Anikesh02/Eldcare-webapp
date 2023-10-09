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
