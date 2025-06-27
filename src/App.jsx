import { useState, useEffect } from "react";
import "./App.css";
import { eggMethods as defaultMethods } from "./data/methods";
import EggMethodCard from "./components/EggMethodCard";
import Timer from "./components/Timer";
import WelcomeModal from "./components/WelcomeModal";

const App = () => {
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showModal, setShowModal] = useState(true);

  // Load saved times and images from localStorage on mount
  useEffect(() => {
    const savedTimes = JSON.parse(localStorage.getItem("eggTimes")) || {};
    const savedImages = JSON.parse(localStorage.getItem("eggImages")) || {};

    const updatedMethods = defaultMethods.map((method) => ({
      ...method,
      time: savedTimes[method.id] || method.time,
      image: savedImages[method.id] || method.image,
    }));

    setMethods(updatedMethods);
  }, []);

  // Handler to update custom time (in seconds) for a method and save to localStorage
  const handleUpdateTime = (id, newTimeSeconds) => {
    const updated = methods.map((m) =>
      m.id === id ? { ...m, time: newTimeSeconds } : m
    );
    setMethods(updated);

    const savedTimes = JSON.parse(localStorage.getItem("eggTimes")) || {};
    savedTimes[id] = newTimeSeconds;
    localStorage.setItem("eggTimes", JSON.stringify(savedTimes));
  };

  // Handler to update custom image (base64 or url) for a method and save to localStorage
  const handleUpdateImage = (id, newImage) => {
    const updated = methods.map((m) =>
      m.id === id ? { ...m, image: newImage } : m
    );
    setMethods(updated);

    const savedImages = JSON.parse(localStorage.getItem("eggImages")) || {};
    savedImages[id] = newImage;
    localStorage.setItem("eggImages", JSON.stringify(savedImages));
  };

  return (
    <div className="app">
      <h1 className="heading">Yolk Clock</h1>
      <h2 className="subheading">Cook the perfect eggs every time!</h2>

      {showModal && <WelcomeModal onClose={() => setShowModal(false)} />}

      <div className="method-cont">
        {!selectedMethod ? (
          <div className="grid">
            {methods.map((method) => (
              <EggMethodCard
                key={method.id}
                method={method}
                onSelect={setSelectedMethod}
                onUpdateTime={handleUpdateTime}
                onUpdateImage={handleUpdateImage}
              />
            ))}
          </div>
        ) : (
          <Timer
            time={selectedMethod.time}
            methodName={selectedMethod.name}
            onBack={() => setSelectedMethod(null)}
            onUpdateTime={(methodName, newTimeSeconds) => {
              // Find method by name and update time globally and localStorage
              const updated = methods.map((m) =>
                m.name === methodName ? { ...m, time: newTimeSeconds } : m
              );
              setMethods(updated);

              const savedTimes = JSON.parse(localStorage.getItem("eggTimes")) || {};
              const methodId = updated.find((m) => m.name === methodName)?.id;
              if (methodId) {
                savedTimes[methodId] = newTimeSeconds;
                localStorage.setItem("eggTimes", JSON.stringify(savedTimes));
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
