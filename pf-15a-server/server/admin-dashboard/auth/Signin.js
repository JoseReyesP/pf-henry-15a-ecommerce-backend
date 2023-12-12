import React, { useState } from "react";
import auth from "./auth-helper.js";
import { Redirect } from "react-router-dom";
import { signin } from "./api-auth.js";

export default function Signin(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const clickSubmit = (event) => {
    event.preventDefault();
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { from } = props.location.state || {
    from: {
      pathname: "/",
    },
  };

  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  return (
    <div>
      <div>Sing in</div>

      <form onSubmit={clickSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          label="email"
          value={values.email}
          onChange={handleChange("email")}
        ></input>
        <label htmlFor="email">Password:</label>
        <input
          id="password"
          type="password"
          label="password"
          value={values.password}
          onChange={handleChange("password")}
        ></input>
        <input type="submit">Submit</input>
      </form>
    </div>
  );
}
