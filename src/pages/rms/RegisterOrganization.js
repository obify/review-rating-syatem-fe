import React, { useEffect, useState } from 'react'
import authService from '../../services/auth.service';
import Swal from 'sweetalert2';

const RegisterOrganization = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!name || !email || !phone) {
      Swal.fire({
        title: "Mandatory Field",
        text: "One or more mandatory fields are empty!",
        icon: "error"
      });
      return;
    }
    let response = null;
    let request = { name, phone, email };
    try {
      response = await authService.registerOrganization(request);
      if (response.status === 201) {
        localStorage.setItem("org", JSON.stringify(response.data));
        setName("");
        setPhone("");
        setEmail("");
        Swal.fire({
          title: "Registration successful",
          text: "Here is your API key: "+response.data.apiKey,
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
  
  useEffect(()=>{
    localStorage.clear();
  }, [])
  return (
    <div>
      <div className='row justify-content-center mt-5'>
      <section className="py-3 text-center container">
            <div className="row py-lg-2">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">Organization Registration</h1>
                    <p className="lead text-muted">Register your organization to get an API Key that you can use to call REST API's of Review System.</p>
                </div>
            </div>
        </section>
        <div className='col-md-6 col-sm-12'>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="orgName" className="form-label">Organization name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="orgName" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Organization email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Organization phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" id="lname" />
              <div id="phoneHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <button type="submit" className="btn btn-primary mb-2 d-flex justify-content-center w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default RegisterOrganization