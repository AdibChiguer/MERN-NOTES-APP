import React from 'react'
import logoutSvg from '../../assets/logout.svg'

const Logout = () => {

  function logout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <div className='logout-container slide-top'>
      <button onClick={ () => {logout()} }>
        <img src={logoutSvg} alt="" />
        <p>Log out</p>
      </button>
    </div> 
  )
}

export default Logout