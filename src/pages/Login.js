import React, {useState} from 'react'
import authService from '../services/auth.service';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';
import {LOGIN_SUCCESS} from '../actions/types';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.auth);

  const handleLogin = async (event)=>{
    event.preventDefault();
    if(!email || !password){
      Swal.fire({
        title: "Mandatory Field",
        text: "One or more mandatory fields are empty!",
        icon: "error"
      });
      return;
    }
    let request = { email, password };
    try{
      let response = await authService.login(request);
      if(response.status == 200){
        dispatch({type: LOGIN_SUCCESS, payload: response.data});
        navigate("/profile");
      }
    }catch(error){
      console.log(error);
      if(error.response.status == 403){
        Swal.fire({
          title: "Unauthorized",
          text: "Invalid credentials",
          icon: "error"
        });
      }
    }
  }
  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }
  return (
    <div>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-sm-12'>
            <h3 className='text-center'>Login now</h3>
        </div>
        <div className='col-md-8 col-sm-12'>
          <form onSubmit={handleLogin}>
    
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login