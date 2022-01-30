import { useContext, useState, useRef } from "react";
import { AppContext, UserContext } from "Context";
import { useOutsideClick } from "hooks";
import { Input, Button } from "components";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const { showLoginPopup, setShowLoginPopup } = useContext(AppContext);
  const { setUserData, userData } = useContext(UserContext);
  const loginPopupRef = useRef(null);
  const navigate = useNavigate();

  useOutsideClick(loginPopupRef, () => setShowLoginPopup(false));


  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { username, password };
    try {
      const req = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await req.json();
      if (res.status === "success") {
        setUserData(res.data);
        setShowLoginPopup(false);
      } else {
        setError(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleForgot = (e) => {
    alert(
      "Hey! It seems like you forgot your password, but this feature is not supported yet. Have a nice day!"
    );
  };

  return !showLoginPopup ? null : (
    <div className="login" ref={loginPopupRef}>
      <h2 className="login--header">LOGIN</h2>
      <form onSubmit={handleLogin} className="login--form">
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          type="text"
          error={error}
        />
        <div className="passHolder">
          <Input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type={showPass ? "text" : "password"}
            error={error}
          />
          <i
            className={`ico far ${showPass ? "fa-eye" : "fa-eye-slash"}`}
            onClick={(e) => setShowPass((prev) => !prev)}
          />
        </div>
        <p onClick={handleForgot} className="login--text">
          Forgot password?
        </p>
        <Button text="LOGIN" />
      </form>
    </div>
  );
};

export default Login;
