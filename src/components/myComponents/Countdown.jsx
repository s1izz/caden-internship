import React, { useState } from "react";

function Countdown({ expiryDate }) {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerHours, setTimerHours] = useState(0);

  setInterval(() => {
    const millis = expiryDate - Date.now();
    const seconds = millis / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;

    setTimerSeconds(Math.floor(seconds % 60));
    setTimerMinutes(Math.floor(minutes % 60));
    setTimerHours(Math.floor(hours % 60));
  }, 1000);

  return (
    <>
      {timerSeconds < 0
        ? "EXPIRED"
        : `${timerHours}h ${timerMinutes}m ${timerSeconds}s`}
    </>
  );
}

export default Countdown;