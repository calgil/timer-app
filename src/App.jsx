import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [timeElapsed, setTimeElapsed] = useState(null);
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(null);

  const minutes = Math.floor(timeElapsed / 60000);
  const seconds = ((timeElapsed % 60000) / 1000).toFixed(0);
  const milliseconds = (timeElapsed % 1000).toFixed(0).slice(0, 2);

  const handleReset = () => {
    setTimeElapsed(null);
    setRunning(false);
    setStartTime(0);
    setPauseTime(null);
  };

  const handleStart = () => {
    setRunning(true);
    if (pauseTime) {
      const pauseDuration = Date.now() - pauseTime;
      return setStartTime(startTime + pauseDuration);
    }
    setStartTime(Date.now());
  };

  const handleStop = () => {
    setRunning(false);
    setPauseTime(Date.now());
  };

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTimeElapsed(Date.now() - startTime);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="App">
      <h1>Timer</h1>
      <div className="display-time">
        <span className="time">{minutes < 10 ? `0${minutes}` : minutes}</span>:
        <span className="time">{seconds < 10 ? `0${seconds}` : seconds}</span>:
        <span className="time">
          {milliseconds < 10 ? `0${milliseconds}` : milliseconds}
        </span>
      </div>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
