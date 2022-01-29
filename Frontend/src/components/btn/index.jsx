import "./button.scss";
import { Link } from "react-router-dom";
import { forwardRef } from "react";

export const LinkButton = ({ to, children, size="", active = false }) => (
    <Link to={to} className="link">
        <div className={`link--btn ${size} ${active ? "active" : ""}`}>
            {children}
        </div>
    </Link>
)

const Button = forwardRef(({ onClick, size="", text, active, ...props }, ref) => (
    <button onClick={onClick} className={`btn ${size} ${active ? "active" : ""}`} {...props} ref={ref}>
        {text}
    </button>
))

export default Button;