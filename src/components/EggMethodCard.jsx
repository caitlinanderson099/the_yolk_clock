import { useState, useRef, useEffect } from "react";
import { PencilSquare } from "react-bootstrap-icons";

const EggMethodCard = ({ method, onSelect, onUpdateTime, onUpdateImage }) => {
  const [customTime, setCustomTime] = useState(method.time / 60);
  const [customImage, setCustomImage] = useState(method.image);
  const fileInputRef = useRef(null);

  // Sync customTime when method.time changes externally (like after Timer edits)
  useEffect(() => {
    setCustomTime(method.time / 60);
  }, [method.time]);

  const handleTimeChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setCustomTime(value);
      onUpdateTime(method.id, value * 60); // update global state
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setCustomImage(base64);
        onUpdateImage(method.id, base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    onSelect({ ...method, time: customTime * 60, image: customImage });
  };

  return (
    <div className="card">
      <div className="image-wrapper">
        <img src={customImage} alt={method.name} className="egg-image" />
        <button className="edit-button" onClick={() => fileInputRef.current.click()}>
          <PencilSquare size={18} />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </div>

      <h2>{method.name}</h2>
      <p>{method.description}</p>

      <label>
        Time (minutes):
        <input
          type="number"
          value={customTime}
          min="1"
          onChange={handleTimeChange}
        />
      </label>

      <button onClick={handleClick}>Start Timer</button>
    </div>
  );
};

export default EggMethodCard;
