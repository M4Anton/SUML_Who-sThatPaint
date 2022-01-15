import "./button.scss";
import { Link } from "react-router-dom";

export const LinkButton = ({ to, children, size="" }) => (
    <Link to={to} className="link">
        <div className={`link--btn ${size}`}>
            {children}
        </div>
    </Link>
)

const Button = ({ onClick, size="", text }) => (
    <button onClick={onClick} className={`btn ${size}`}>
        {text}
    </button>
)

export default Button;