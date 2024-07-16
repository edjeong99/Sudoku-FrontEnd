import React, { useState, useEffect } from 'react';

const Timer = ({ isSolved, reset }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (isSolved) {
      setRunning(false);
    }
  }, [isSolved]);

  useEffect(() => {
   
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      setRunning(true);
  }, [reset]);

  useEffect(() => {
   
    let interval = null;

    if (running) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => (prevMinutes === 59 ? 0 : prevMinutes + 1));
            return 0;
          } else {
            return prevSeconds + 1;
          }
        });

        if (minutes === 59 && seconds === 59) {
          setHours((prevHours) => prevHours + 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);


  return (
    <div className="timer text-center">
      <span>{String(hours).padStart(2, '0')}:</span>
      <span>{String(minutes).padStart(2, '0')}:</span>
      <span>{String(seconds).padStart(2, '0')}</span>
    </div>
  );
};

export default Timer;