import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Login = () => {
   const [inputs, setInputs] = useState({
     username: "",
     password: "",
   });
  
  const { login } = useContext(AuthContext)

   const [err, setErr] = useState("");
   const navigate = useNavigate();
   const handleChange = (e) => {
     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       await login(inputs)
       navigate("/");
     } catch (err) {
       setErr(err.response.data);
     }
   };
  return (
      <div className='auth'>
          <h1>Login</h1>
          <form>
        <input required type="text" name="username" placeholder="username" onChange={handleChange} />
            <input required type="password" name="password" placeholder='password' onChange={handleChange} />
            <button onClick={handleSubmit}>Login</button>
            {err && <p>{ err}</p>}
            <span>Don't you registered <Link to="/register">Register</Link></span>
          </form>
    </div>
  )
}

export default Login