import "./signup.scss";

import { Input, Button, LinkButton } from "components";
import signup from "images/sign-up.webp";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "Context";
import { useNavigate } from "react-router-dom";

const signupInputs = [
  { name: "username", type: "text", label: "Username" },
  { name: "password", type: "password", label: "Password" },
  { name: "confirm", type: "password", label: "Confirm Password" },
  { name: "email", type: "email", label: "E-mail" },
];

const SignUp = (props) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    if (data.confirm?.length && data.password?.length) {
      if (data.confirm !== data.password) {
        setErrors((prev) => ({
          ...prev,
          confirm: "Password and Password confirmation have to be the same",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          confirm: "",
        }));
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        confirm: "",
      }));
    }
    //eslint-disable-next-line
  }, [data.confirm, data.password]);

  useEffect(() => {
    if(submitted) {
      handleSubmit();
      setSubmitted(false);
    }
  }, [submitted])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors(prev => ({...prev, [name]: ''}));
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const error = Object.values(errors).filter(err => err.length);
    if(error.length) return
    try {
      const req = await fetch("/sign_up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await req.json();
      if (res.status === "success") {
        setUserData(res.data)
        setSuccess(true);
        setErrors({});
      } else {
        setErrors(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="flex--container">
      {success ? (
        <div className="signup--success">
          <h1 className="signup--header">
            Nicely done!            
          </h1>
          <h3 className="signup--success-text">Click the button below to start!</h3>
          <LinkButton to="/" size="big">Expose some painting author!</LinkButton>
        </div>
      ) : (
        <>
          <div className="signup--container">
            <h2 className="signup--header">Sign up</h2>
            <form className="signup--form" onSubmit={onSubmitClick}>
              {signupInputs.map(({ name, type, label }) => (
                <Input
                  key={name}
                  type={type}
                  label={label}
                  name={name}
                  onChange={handleChange}
                  required
                  error={errors[name]}
                />
              ))}
              <Button text="Sign up" />
            </form>
          </div>
          <div className="image--container">
            <img src={signup} className="signup-image" alt="signup" />
          </div>
        </>
      )}
    </div>
  );
};

export default SignUp;
