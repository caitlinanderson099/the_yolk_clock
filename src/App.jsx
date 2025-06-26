import { useState, useEffect } from 'react';
import './App.css';
import { eggMethods as defaultMethods } from './data/methods';
import EggMethodCard from './components/EggMethodCard';
import Timer from './components/Timer';

const App = () => {
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);

  // Load from localStorage or use defaults
  useEffect(() => {
    const savedTimes = JSON.parse(localStorage.getItem("eggTimes")) || {};
    const updatedMethods = defaultMethods.map((method) => ({
      ...method,
      time: savedTimes[method.id] || method.time,
    }));
    setMethods(updatedMethods);
  }, []);

  // Save custom time to localStorage
  const handleUpdateTime = (id, newTimeMinutes) => {
    const updated = methods.map((m) =>
      m.id === id ? { ...m, time: newTimeMinutes * 60 } : m
    );
    setMethods(updated);

    const saved = JSON.parse(localStorage.getItem("eggTimes")) || {};
    saved[id] = newTimeMinutes * 60;
    localStorage.setItem("eggTimes", JSON.stringify(saved));
  };

  return (
    <div className="app">
      <h1>🥚The Yolk Clock</h1>
      <h2>Your very own timer to cook the perfect eggs!</h2>
      <div className="method-cont">
        {!selectedMethod ? (
        <div className="grid">
          {methods.map((method) => (
            <EggMethodCard
              key={method.id}
              method={method}
              onSelect={setSelectedMethod}
              onUpdateTime={handleUpdateTime}
            />
          ))}
        </div>
      ) : (
        <Timer time={selectedMethod.time} onBack={() => setSelectedMethod(null)} />
      )}
      </div>
    </div>
  );
};

export default App;
