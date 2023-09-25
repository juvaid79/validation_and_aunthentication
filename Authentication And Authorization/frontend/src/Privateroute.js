import './App.css'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';



function Privateroute() {
  const loggedin = localStorage.getItem("loggedin")
  console.log(loggedin)
  if (loggedin) {
    return <Outlet />
  }
  return <Navigate to="/"></Navigate>

}

export default Privateroute