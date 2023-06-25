import React from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";

const PrivateComp = () => {
  const auth = localStorage.getItem("user");
  return auth ? <Outlet /> : redirect("/login");
};

export default PrivateComp;
