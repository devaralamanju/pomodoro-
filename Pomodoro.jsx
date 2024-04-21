import React, { useState, useEffect } from 'react';
import './App.css';

function Pomodoro() {
  const [time, setTime] = useState(25 * 60); 
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('Pomodoro ');

  useEffect(() => {
    let interval;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      // Switch session type when timer reaches zero
      setSessionType(prevType => (prevType === 'Pomodoro' ? 'Break' : 'Pomodoro Count'));
      setTime(prevType => (prevType === 'Pomodoro' ? 5 * 60 : 25 * 60)); // Break time is 5 minutes
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
    setSessionType('Pomodoro');
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pomodoro-block">
      <div className="pomodor-inner">
      <h1 className='pomodoro-heading'>{sessionType}</h1>
      <h2 className="pomodoro-count">{formatTime(time)}</h2>
      <div className="buttons">
        <button className="pomodoro-pause" onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button className="pomodoro-reset" onClick={resetTimer}>Reset</button>
      </div>
      </div>
    </div>
  );
}

export default Pomodoro;
