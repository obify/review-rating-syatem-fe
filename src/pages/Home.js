import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { user, isLoggedIn } = useSelector(state => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div>Home</div>
  )
}

export default Home