import "./footer.scss";
import { ReactComponent as Logo } from "images/logo.svg";
import { Link } from "react-router-dom";

const Footer = (props) => {
  const date = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="flex-centered">
        <h3>Creators: </h3>
        <ul className="creators--list">
          <li className="creators--list-item">
            Maciej Antończak - <span className="u-bold">S18175</span>
          </li>
          <li className="creators--list-item">
            Kacper Ratajczak - <span className="u-bold">S18754</span>
          </li>
          <li className="creators--list-item">
            Mateusz Wasilewski - <span className="u-bold">S18668</span>
          </li>
        </ul>
      </div>
      <div className="flex-centered">
        <h3>Purpose:</h3>
        <p className="purpose--text">
          This project has been created for SUML classes on PJATK.
        </p>
      </div>
      <div className="flex-centered">
        <Link to="/">
          <Logo width="100px" />
        </Link>
        <p className="copyright--text">Who's that paint? &copy;{date}</p>
      </div>
    </footer>
  );
};

export default Footer;
