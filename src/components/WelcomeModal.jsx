
const WelcomeModal = ({ onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <img src="/timer.png" alt="Picture of Egg Timer"  width="150px" height="150px"/>
        <h2>Welcome to The Yolk Clock!</h2>
        <p>Choose how you'd like your eggs cooked and start the perfect timer.</p>
        <button onClick={onClose}>Let’s Get Started!</button>
      </div>
    </div>
  );
};

export default WelcomeModal;
