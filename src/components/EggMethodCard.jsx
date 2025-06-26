import { useState } from "react";

const EggMethodCard = ({ method, onSelect, onUpdateTime }) => {
  const [customTime, setCustomTime] = useState(method.time / 60); // minutes

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setCustomTime(value);
    onUpdateTime(method.id, value);
  };

  const handleClick = () => {
    onSelect({ ...method, time: customTime * 60 });
  };

  return (
    <div className="card">
      <div className="card-img">
      <img src={method.image} alt={method.name} />

      </div>
      <h2>{method.name}</h2>
      <p>{method.description}</p>
      <label>
        Time (minutes):
        <input
          type="number"
          value={customTime}
          min="1"
          onChange={handleChange}
        />
      </label>
      <button onClick={handleClick}>Start Timer</button>
    </div>
  );
};

export default EggMethodCard;
