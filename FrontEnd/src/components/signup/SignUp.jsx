import React, { useState } from 'react'
import './signup.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import axios from 'axios'


const SignUp = () => {

  const [user , setUser] = useState({
    userName: '',
    email: '',
    password: '',
  })

  const [err , setErr] = useState('')


  async function signup() {
    if (user.userName === '' || user.email === '' || user.password === '') {
      setErr('please fill all the fields')
      return;
    }
    await axios.post('http://localhost:5000/signup', {
      username: user.userName,
      email: user.email,
      password: user.password
    })
    .then((res) => {
      window.location.href = '/login'
    })
    .catch((err) => {
      setErr(err.response.data.errMessage);
    })
  }

  function getuserName(e) {
    setUser(prevUser => ({ ...prevUser, userName: e.target.value }));
  }

  function getemail(e) { 
    setUser(prevUser => ({ ...prevUser, email: e.target.value }))
  }

  function getpassword(e) {
    setUser(prevUser => ({ ...prevUser, password: e.target.value }))
  }

  return (
    <div className='signup-container'>
      <div className="leftside-container"></div>      
      <div className="rightside-container"></div>
      <div className="form-container">
        <div className="logo-side-signup">
          <img src={logo} alt="" />
        </div>
        <div className="form-side-signup">
          <h1>Sign up</h1>
          <div className="input_link-signup">
            {err === '' ? null : <p className='err'>{err}</p>}
            <div className="inputs side-margin">
              <div className="input-userName">
                <label htmlFor="userName">username</label>
                <input type="text" id="userName" placeholder='username...' onChange={getuserName}/>
              </div>
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
              <p>Already have an account? <Link to='/login'>Log in</Link></p>
            </div>
          </div>
          <div className="signup-btns side-margin">
            <button onClick={() => {signup()}}>sign up</button>
          </div>

        </div>
      </div>
      {/* <p>Do not have an account yet ? <Link to='/signup'>Create one!</Link></p> */}
    </div>
  )
}

export default SignUp
