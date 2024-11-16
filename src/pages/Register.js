import React, { useState } from 'react'
import authService from '../services/auth.service';
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

const Register = () => {
  const { user, isLoggedIn } = useSelector(state => state.auth);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_USER");

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      Swal.fire({
        title: "Mandatory Field",
        text: "One or more mandatory fields are empty!",
        icon: "error"
      });
      return;
    }
    let response = null;
    let request = { firstName: firstName, lastName: lastName, email, password, roles: [role] };
    try {
      response = await authService.register(request);
      if (response.status == 201) {
        Swal.fire({
          title: "Congratulations",
          text: "Registration successful",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Registration not successful",
          icon: "error"
        });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data[0].code,
        text: error.response.data[0].message,
        icon: "error"
      });
    }
  }
  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }
  return (
    <div>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-sm-12'>
          <h3 className='text-center'>Register now</h3>
        </div>
        <div className='col-md-8 col-sm-12'>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="fname" className="form-label">First name</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" id="fname" />
            </div>
            <div className="mb-3">
              <label htmlFor="lname" className="form-label">Last name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" id="lname" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3">
              <label htmlFor="roleSel" className="form-label">Select role</label>
              <select onChange={(e)=>setRole(e.target.value)} id="roleSel" className="form-select" aria-label="Default select example">
                <option defaultValue value="ROLE_USER">User</option>
                <option value="ROLE_MODERATOR">Moderator</option>
                <option value="ROLE_ADMIN">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Register