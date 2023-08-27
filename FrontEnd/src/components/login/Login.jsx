import React , {useState} from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './login.css'

const Login = () => {

  const [user , setUser] = useState({
    email: '',
    password: '',
  })

  const [err , setErr] = useState('')

  function getemail(e) { 
    setUser(prevUser => ({ ...prevUser, email: e.target.value }))
  }

  function getpassword(e) {
    setUser(prevUser => ({ ...prevUser, password: e.target.value }))
  }

  async function login() {
    if (user.userName === '' || user.email === '' || user.password === '') {
      setErr('please fill all the fields')
      return;
    }
    await axios.post('https://mern-notes-app-65gy.onrender.com/login', {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem('token', res.data.token);
      window.location = '/';
    })
    .catch(err => {
      // console.log(err);
      setErr(err.response.data.errMessage)
    })
  }

  return (
    <div className='signup-container'>
      <div className="leftside-container"></div>      
      <div className="rightside-container"></div>
      <div className="form-container">
        <div className="logo-side">
          <img src={logo} alt="" />
        </div>
        <div className="form-side">
          <h1>Log in</h1>
          <div className="input_link">
            {err === '' ? null : <p className='err'>{err}</p>}
            <div className="inputs side-margin">
              <div className="input-email">
                <label htmlFor="email">email</label>
                <input type="email" id="email" placeholder='email...' onChange={getemail}/>
              </div>
              <div className="input-password">
                <label htmlFor="password">password</label>
                <input type="password" id="password" placeholder='password...' onChange={getpassword}/>
              </div>
            </div>
            <div className="redirecte-to-Login side-margin">
              <p>Do not have an account yet ? <Link to='/signup'>Create one!</Link></p>
            </div>
          </div>
          <div className="signup-btn side-margin">
            <button onClick={() => {login()}}>Log in</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login