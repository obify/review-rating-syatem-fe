import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

const Profile = () => {

  const { user, isLoggedIn } = useSelector(state => state.auth);
  console.log(user);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container my-5 d-flex flex-column">
      <div className="p-5 text-center bg-body-tertiary rounded-3">
        <h1 className="text-body-emphasis">{user.firstName} {user.lastName}</h1>
        <p className="col-lg-8 mx-auto fs-5 text-muted">
          {user.email}
        </p>
        <p className="col-lg-8 mx-auto fs-5 text-muted">
          {user.roles}
        </p>
      </div>
    </div>
  )
}

export default Profile