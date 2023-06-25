import { Button } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    console.log("logout");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      {auth ? (
        <>
          <Button onClick={logoutHandler} type="primary">
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </div>
  );
};

export default Nav;
