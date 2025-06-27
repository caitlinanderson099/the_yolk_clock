import { useEffect, useState, useRef } from "react";

const Timer = ({ time, methodName, onBack, onUpdateTime }) => {
  const [customTime, setCustomTime] = useState(time / 60);
  const [secondsLeft, setSecondsLeft] = useState(time);
  const [isRunning, setIsRunning] = useState(false);
  const [showDoneModal, setShowDoneModal] = useState(false);
  const initialTimeRef = useRef(time);
  const audioRef = useRef(null);

  // Sync external time changes
  useEffect(() => {
    setCustomTime(time / 60);
    setSecondsLeft(time);
    initialTimeRef.current = time;
    setIsRunning(false);
  }, [time]);

  // Countdown logic
  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            setShowDoneModal(true);
            playSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.warn("Autoplay blocked:", err);
      });
    }
  };

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${min}:${secs.toString().padStart(2, "0")}`;
  };

  const handleTimeChange = (e) => {
    const val = parseInt(e.target.value);
    if (val >= 1) {
      setCustomTime(val);
      onUpdateTime(methodName, val * 60);
      setIsRunning(false);
      setSecondsLeft(val * 60);
    }
  };

  return (
    <>
      <div className="timer">
        <img src="/timer-animation.gif" alt="Fried Egg GIF" />

        <div className="timer-details">
          <h2>{methodName} Timer</h2>

          <p>{formatTime(secondsLeft)}</p>

          <label>
            Adjust Time (minutes):&nbsp;
            <input
              type="number"
              min="1"
              value={customTime}
              onChange={handleTimeChange}
            />
          </label>

          <div className="controls">
            {!isRunning ? (
            <button onClick={() => {
              audioRef.current?.load(); // "warm up" the audio
              setIsRunning(true);
            }}>Start</button>            ) : (
              <button onClick={() => setIsRunning(false)}>Pause</button>
            )}
            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft(customTime * 60);
              }}
            >
              Reset
            </button>
            <button onClick={onBack}>Back</button>
          </div>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src="/alarm.mp3" preload="auto" loop/>

      {/* 🍳 Done Modal */}
      {showDoneModal && (
        <div className="done-modal">
          <div className="done-box">
            <h2>{methodName} Egg is Ready!</h2>
            <p>Your eggs are done – enjoy!</p>
            <button
  onClick={() => {
    setShowDoneModal(false);
    setSecondsLeft(customTime * 60);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // reset to start
    }
  }}
>
  OK
</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Timer;
