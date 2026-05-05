import "./Button.css";

const Button = ({ text, onClick, variant }) => {
  return (
    <button className={variant} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
