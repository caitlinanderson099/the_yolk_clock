import { useEffect, useState, useRef } from "react";

const Timer = ({ time, onBack }) => {
  const [secondsLeft, setSecondsLeft] = useState(time);
  const [isRunning, setIsRunning] = useState(false);
  const initialTimeRef = useRef(time);

  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            alert("Your eggs are ready!");
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${min}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="timer">
      <h2>Timer</h2>
      <p>{formatTime(secondsLeft)}</p>
      <div className="controls">
        {!isRunning ? (
          <button onClick={() => setIsRunning(true)}>Start</button>
        ) : (
          <button onClick={() => setIsRunning(false)}>Pause</button>
        )}
        <button
          onClick={() => {
            setIsRunning(false);
            setSecondsLeft(initialTimeRef.current);
          }}
        >
          Reset
        </button>
        <button onClick={onBack}>Back</button>
      </div>
    </div>
  );
};

export default Timer;
