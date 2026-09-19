import "./Button.css";

function Button({ onClick }) {
  return (
    <button
      className="start-button"
      onClick={onClick}
    >
      Comenzar
    </button>
  );
}

export default Button;