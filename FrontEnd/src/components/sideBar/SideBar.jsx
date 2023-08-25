import React , {useState , useEffect} from 'react'
import './sidebar.css'
import plus from '../../assets/icon-plus.svg'
import close from '../../assets/close.png'  
import { Link } from 'react-router-dom'
import Logout from '../logout/Logout'


const SideBar = ({notes , user , Width , ontoggele , toggle}) => {

  const [showlogout, setShowLogout] = useState(false)
  const [classBar, setClassBar] = useState('')

useEffect(() => {
  const newClassBar = (Width <= 790 && toggle) ? 'show-sidebar' : 'hide-sidebar';

  if (newClassBar !== classBar) {
    setClassBar(newClassBar);
  }
}, [Width, toggle, classBar]);

  
  function showSideNotes(notes) {
    return notes?.map((note) => (
      <div className="head-note-title" key={note.title + note._id} id={note._id}>
        <button>
          <Link to={`/n/${note._id}`}>
            <p>{note.title}</p>
          </Link>
        </button>
      </div>
    ));
  }

  function toggleLogout() {
    setShowLogout(!showlogout)
  }

  return (
    <div className={`sideBar-container ${classBar}`}>
      <div className='headerContainer head'>
        <div className="content">
          <Link to={'/Createnote'}>
            <img src={plus} alt="" />
            <p>new note</p>
          </Link>
        </div>
        <img src={close} className='close' alt="" onClick={ontoggele} />
      </div>
      <div className='notes-menu'>
        <div className="titles">
          { 
            notes?.length !== 0 ? showSideNotes(notes) : null
          }
        </div>
      </div>
      <div className="userInfo">
        {showlogout && <Logout/>}
        <h2 onClick={() => {toggleLogout()}}>{user?.username}</h2>
      </div>
    </div>
  )
}

export default SideBar