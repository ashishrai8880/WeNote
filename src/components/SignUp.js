import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);

    const url = `http://localhost:5000/api/auth/createuser`

    if (credentials.password === credentials.cpassword) {

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      // console.log(json);

      if (json.success) {
        localStorage.setItem('token' , json.token);
        navigate("/");
      } else {
        alert(json.message);
      }


    } else {
      alert("Confirm Password and Password are different");
      // setCredentials({ password: "", cpassword: "" });
    }

  }

  const onChange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} required minLength={5} />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default SignUp