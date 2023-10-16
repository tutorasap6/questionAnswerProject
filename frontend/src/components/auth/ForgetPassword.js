import { useState } from "react";
import * as React from "react";
import axios from "axios";
import styled from "styled-components";
import logocom from "../../assets/images/logocom.png";

const ForgetPassword = () => {
  const [values, setValues] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("clicked", values.email);
    axios
      .post(`${process.env.api_url}/api/email/reset-email`, values)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => console.log(err));
    console.log(values);
  };

  return (
    <FormContainer style={{ margin: "-8px" }}>
      <div className="form-class">
        <div className="brand">
          <img src={logocom} alt="logo" />
          <h1>Champlain</h1>
        </div>

        <input
          type="text"
          placeholder="Your Email"
          name="email"
          onChange={handleChange}
          loading={loading}
        />
        <div>
          <button onClick={handleSubmit}>Send Email</button>
        </div>
      </div>
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

  .form-class {
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
export default ForgetPassword;
