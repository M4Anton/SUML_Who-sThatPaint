import "./header.scss"
import { useContext } from "react";
import { AppContext } from "Context";
import { ReactComponent as Logo } from "images/logo.svg";
import { Link } from "react-router-dom";
import { LinkButton, Button } from "components";




const Header = (props) => {
    const { setShowLoginPopup } = useContext(AppContext);
    const toggleLogin = () => setShowLoginPopup(prev => !prev);

    return (
        <header className="header">
            <div className="header--col">
                <Link to="/" className="link">
                    <Logo height="50px" />
                    <h2 className="logo--text">
                        Who's that paint?
                    </h2>
                </Link>
                <LinkButton to="/single">
                    Single shot
                </LinkButton>
            </div>
            <div className="header--col">
                <LinkButton to="/signup">
                    Sign up
                </LinkButton>
                <Button onClick={toggleLogin} text="Login" />
            </div>
        </header>
    )
}

export default Header;