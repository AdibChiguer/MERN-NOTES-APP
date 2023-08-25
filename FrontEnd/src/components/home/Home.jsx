import React from 'react'
import './home.css'
import svg from '../../assets/undraw_notes_re_pxhw.svg'
import menu from '../../assets/menu.png'

const Home = ({Width , ontoggele}) => {

  return (
    <div className='home-container'>
      {
        Width <= 790 && 
        <div className="navbar head">
          <img src={menu} alt=""  onClick={ontoggele}/>
          <h2>note it</h2>
        </div>
      }
      
      <div className="main-content">
        <img src={svg} alt="" />
        <h2>click on new note to create one</h2>
      </div>
      {/* {Width < 800 && <h2>or</h2>} */}
    </div>
  )
}

export default Home