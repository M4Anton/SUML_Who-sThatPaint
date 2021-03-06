import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "Context";

import { Home, Login, SignUp, Single } from "containers";

import "./content.scss";

const Content = (props) => {
  const { auth } = useContext(UserContext);


  return (
    <center className="content">
      <Routes>
        <Route exact path="/" element={auth ? <Single /> : <Home />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/single" element={<Single />} />
      </Routes>
      <Login />
    </center>
  );
};

export default Content;
