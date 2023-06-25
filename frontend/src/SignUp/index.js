import React, { useState } from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const onChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setError(false);
  };

  const submitHandler = async () => {
    if (
      !inputValue.name.trim() ||
      !inputValue.email.trim() ||
      !inputValue.password.trim()
    ) {
      setError(true);
      return;
    } else {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({ ...inputValue }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      }
    }
  };
  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <Input
        placeholder="Enter Name"
        value={inputValue.name}
        type="text"
        name="name"
        onChange={onChange}
        status={error && !inputValue.name.trim() && "error"}
      />
      <Input
        placeholder="Enter Email"
        value={inputValue.email}
        type="text"
        name="email"
        onChange={onChange}
        status={error && !inputValue.email.trim() && "error"}
      />
      <Input.Password
        placeholder="Enter Password"
        name="password"
        value={inputValue.password}
        onChange={onChange}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        status={error && !inputValue.password.trim() && "error"}
      />
      <button onClick={submitHandler}>Sign Up</button>
    </div>
  );
};

export default SignUp;
