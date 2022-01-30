import "./header.scss";
import { useContext } from "react";
import { AppContext, UserContext } from "Context";
import { ReactComponent as Logo } from "images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { LinkButton, Button } from "components";

const Header = (props) => {
  const { setShowLoginPopup, showLoginPopup } = useContext(AppContext);
  const { auth, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleLogin = () => setShowLoginPopup(!showLoginPopup);

  const handleLogout = async () => {
    try {
      const req = await fetch("/logout");
      const res = await req.json();
      if (res.status === "ok") {
          setUserData({});
          navigate("/", { replace: true});
        }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="header">
      <div className="header--col">
        <Link to={"/"} className="link">
          <Logo height="50px" />
          <h2 className="logo--text">Who's that paint?</h2>
        </Link>
      </div>

      {auth ? (
        <div className="header--col">
          <LinkButton
            to="/"
            active={window.location.pathname === "/"}
          >
            New search
          </LinkButton>
          <Button onClick={handleLogout} text="Logout" />
        </div>
      ) : (
        <div className="header--col">
          <LinkButton
            to="/signup"
            active={window.location.pathname === "/signup"}
          >
            Sign up
          </LinkButton>
          <Button onClick={toggleLogin} text="Login" active={showLoginPopup} />
        </div>
      )}
    </header>
  );
};

export default Header;
