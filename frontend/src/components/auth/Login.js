import { useState } from "react";
import * as React from "react";
import axios from "axios";
import { Link, navigate } from "gatsby";
import styled from "styled-components";
import logocom from "../../assets/images/logocom.png";
import { loginRoute } from "../../utils/APIRoutes";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (validateForm()) {
    const { email, password } = values;
    const { data } = await axios.post(loginRoute, {
      email,
      password,
    });
    if (data.status === false) {
      setErrors(data.errors);
    }
    if (data.status === true) {
      console.log(data.token);
      localStorage.setItem("token", data.token);
      const res = await axios({
        method: "GET",
        url: `${process.env.api_url}/api/auth`,
        headers: {
          "x-auth-token": data.token,
        },
      });
      if (res.data.role === "admin") navigate("/admin/admin");
      else navigate("/");
    }
  };
  return (
    <FormContainer style={{ margin: "-8px" }}>
      <form action="" onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
        <a href="/" style={{ margin: '0 auto' }}>
          <img src={logocom} alt="logo" />
          </a>
          <h1>Champlain</h1>
        </div>
        {errors && (
          <div>
            <p
              style={{
                color: "red",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              {errors ? errors : ""}
            </p>
          </div>
        )}
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => handleChange(e)}
          name="email"
          min="3"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <Link to = "/auth/forgetpassword">Forgot Password</Link>
        <div>
          <button type="submit">Log In</button>
        </div>
        
        <span style={{ textAlign: "center" }}>
          Don't have an account ? <Link to="/auth/register">Create One.</Link>
        </span>

      </form>
    </FormContainer>
  );
};
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;
