import "./Button.css";

const Button = ({ text, onClick, variant, children}) => {
  return (
    <button className={variant} onClick={onClick}>
      {children || text}
    </button>
  );
};

export default Button;