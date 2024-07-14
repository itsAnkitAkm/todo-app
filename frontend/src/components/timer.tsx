import React, { useEffect, useState } from 'react';

const ActiveDuration = ({ lastResumedAt, lastPausedAt }) => {
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [currentElapsedTime, setCurrentElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    // Clear previous interval if exists
    if (timerInterval) clearInterval(timerInterval);

    // Calculate initial elapsed time if resumed from paused state
    if (lastResumedAt && lastPausedAt) {
      const pausedTime = new Date(lastPausedAt).getTime();
      const resumedTime = new Date(lastResumedAt).getTime();
      const elapsedFromPaused = resumedTime - pausedTime;
      setTotalElapsedTime((prevElapsedTime) => prevElapsedTime + elapsedFromPaused);
    }

    // Start new interval to update current elapsed time
    const interval = setInterval(() => {
      setCurrentElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
    }, 1000);

    setTimerInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, [lastResumedAt, lastPausedAt]);

  useEffect(() => {
    if (lastPausedAt) {
      const pausedTime = new Date(lastPausedAt).getTime();
      const resumedTime = new Date(lastResumedAt).getTime();
      const elapsedFromPaused = resumedTime - pausedTime;
      setTotalElapsedTime((prevElapsedTime) => prevElapsedTime + elapsedFromPaused);
      setCurrentElapsedTime(0);
    }
  }, [lastPausedAt]);

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return <span>{formatTime(totalElapsedTime + currentElapsedTime)}</span>;
};

export default ActiveDuration;
