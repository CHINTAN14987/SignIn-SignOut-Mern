import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const onChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setError(false);
  };
  const auth = localStorage.getItem("user");

  const submitHandler = async () => {
    if (!inputValue.email.trim() || !inputValue.password.trim()) {
      setError(true);
      return;
    } else {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({ ...inputValue }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data, "data");
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      }
    }
  };
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);
  return (
    <div className={styles.container}>
      <h1>Login</h1>

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
      <h6>
        Not a registered member <Link to="/signup">Sign Up</Link>
      </h6>
      <button onClick={submitHandler}>Sign Up</button>
    </div>
  );
};

export default Login;
