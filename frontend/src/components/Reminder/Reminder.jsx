import React, { useState, useEffect } from 'react';

function Reminder() {
  const [reminders, setReminders] = useState([]);
  const [text, setText] = useState('');
  const [dailyTime, setDailyTime] = useState('');
  const [oneTimeDate, setOneTimeDate] = useState('');
  const [oneTimeTime, setOneTimeTime] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const addDailyReminder = () => {
    if (text.trim() === '' || dailyTime.trim() === '') return;

    // Parse the user-provided daily time
    const timeParts = dailyTime.split(':');
    if (timeParts.length !== 2 || isNaN(timeParts[0]) || isNaN(timeParts[1])) {
      alert('Invalid daily time format. Please enter a valid time (e.g., "12:00").');
      return;
    }

    const [hours, minutes] = timeParts.map(Number);

    // Create a Date object with the current date and the user-specified daily time
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0, 0);

    // Add the daily reminder
    setReminders([...reminders, { text, time: reminderTime, daily: true }]);
    setText('');
    setDailyTime('');
  };

  const addOneTimeReminder = () => {
    if (text.trim() === '' || oneTimeDate.trim() === '' || oneTimeTime.trim() === '') return;

    // Parse the user-provided one-time date and time
    const [year, month, day] = oneTimeDate.split('-').map(Number);
    const timeParts = oneTimeTime.split(':').map(Number);

    if (timeParts.length !== 2 || isNaN(year) || isNaN(month) || isNaN(day) || isNaN(timeParts[0]) || isNaN(timeParts[1])) {
      alert('Invalid date or time format. Please enter valid values.');
      return;
    }

    const [hours, minutes] = timeParts;

    // Create a Date object for the one-time reminder
    const reminderTime = new Date(year, month - 1, day, hours, minutes);

    // Add the one-time reminder
    setReminders([...reminders, { text, time: reminderTime, daily: false }]);
    setText('');
    setOneTimeDate('');
    setOneTimeTime('');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();

      reminders.forEach((reminder, index) => {
        if (isTimeToDisplayReminder(reminder, currentTime)) {
          alert(`Reminder: ${reminder.text}`);
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [reminders]);

  const isTimeToDisplayReminder = (reminder, currentTime) => {
    if (reminder.daily) {
      // For daily reminders, check the time only
      const [hours, minutes] = dailyTime.split(':').map(Number);
      return (
        currentTime.getHours() === hours && currentTime.getMinutes() === minutes &&
        !reminder.displayedToday
      );
    } else {
      // For one-time reminders, check both date and time
      return reminder.time <= currentTime && !reminder.displayedToday;
    }
  };

  // Mark daily reminders as displayed for today
  useEffect(() => {
    const currentDate = new Date();
    reminders.forEach((reminder, index) => {
      if (reminder.daily) {
        reminder.displayedToday = reminder.time.getHours() === currentDate.getHours() &&
                                  reminder.time.getMinutes() === currentDate.getMinutes();
      }
    });
  }, [reminders]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Reminder App</h1>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="border rounded p-2 w-full"
          placeholder="Add a reminder..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex space-x-2">
          <label className="flex items-center space-x-1">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={dailyTime !== ''}
              onChange={() => setDailyTime('')}
            />
            <span className="text-sm">Daily</span>
          </label>
          {!dailyTime && (
            <input
              type="time"
              className="border rounded p-2"
              value={dailyTime}
              onChange={(e) => setDailyTime(e.target.value)}
            />
          )}
        </div>
        <input
          type="date"
          className="border rounded p-2"
          value={oneTimeDate}
          onChange={(e) => setOneTimeDate(e.target.value)}
        />
        <input
          type="time"
          className="border rounded p-2"
          value={oneTimeTime}
          onChange={(e) => setOneTimeTime(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={addDailyReminder}
        >
          Add Daily
        </button>
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={addOneTimeReminder}
        >
          Add One-Time
        </button>
      </div>
      <ul className="mt-4">
        {reminders.map((reminder, index) => (
          <li
            key={index}
            className="py-2 bg-gray-100 border rounded p-2 flex justify-between items-center"
          >
            <div>
              {reminder.text}
              {reminder.daily && ' (Daily)'}
              {reminder.time && ` - ${reminder.time.toLocaleString()}`}
            </div>
            <button
              className="text-red-500"
              onClick={() => {
                const updatedReminders = [...reminders];
                updatedReminders.splice(index, 1);
                setReminders(updatedReminders);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reminder;
