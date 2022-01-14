import { useContext } from "react";
import { Route } from "react-router-dom";

import "./content.scss";

const Content = (props) => {
    console.log("content connected");

    return (
        <center className="content"> 
            <p>HELLO FROM CONTENT</p>
            {/* <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/sign_up" component={SignUp} /> */}
        </center>
    )
}

export default Content;