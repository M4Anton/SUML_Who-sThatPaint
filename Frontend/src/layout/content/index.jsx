import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AppContext, UserContext } from "Context";

import { Home, Login, SignUp, Single } from "containers";

import "./content.scss";

const Content = (props) => {
  const { showLoginPopup } = useContext(AppContext);
  const { userData } = useContext(UserContext);

  console.log(showLoginPopup);

  return (
    <center className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/single" element={<Single />} />
      </Routes>
    </center>
  );
};

export default Content;
