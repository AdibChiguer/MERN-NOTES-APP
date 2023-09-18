import React , {useState} from 'react'
import logoutSvg from '../../assets/logout.svg'

const Logout = () => {
  const [isSubmited, setIsSubmited] = useState(false);

  function logout() {
    setIsSubmited(true);
    localStorage.removeItem('token');
    window.location.href = '/login';
    setIsSubmited(false);
  }

  return (
    <div className='logout-container slide-top'>
      <button onClick={ () => {logout()} } disabled={isSubmited}>
        <img src={logoutSvg} alt="" />
        <p>Log out</p>
      </button>
    </div> 
  )
}

export default Logout