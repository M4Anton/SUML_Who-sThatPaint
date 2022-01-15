import "./home.scss";
import hello from "images/welcome_robot1.gif";
import { LinkButton } from "components";

const Home = (props) => {
  return (
    <div className="home">
      <div className="flex-centered">
        <img src={hello} />
        <div className="text">
          <h2 className="text--title">
            Welcome to <span className="u-bold">Who's that paint!</span>
          </h2>
          <p className="text--desc">
            With this tool you'll be able to quickly figure out who painted the
            image you're looking at right now.
          </p>
          <p className="text--desc">
            <span className="u-bold">Sign up</span> to keep track of your
            searches and note your thoughts about it, or go to{" "}
            <span className="u-bold">"Single shot"</span> to take it for a spin!
          </p>
          <div className="text--button-container">
            <LinkButton to="/single" size="btn-big" >Single shot</LinkButton>
            <LinkButton to="/signup" size="btn-big">Sign up</LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
