import "./input.scss";

const Input = ({ label = "", error = '', ...props }) => (
  <div className="input--container">
    {label.length ? <label htmlFor={props.name} className="input--label">{label}</label> : null}
    <input className="input" {...props} />
    {error.length ? <label htmlFor={props.name} className="input--error">{error}</label> : null}
  </div>
);

export default Input;
