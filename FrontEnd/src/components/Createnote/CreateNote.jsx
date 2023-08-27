import React , {useState} from 'react'
import './createnote.css'
import axios from 'axios';
import { AiOutlineArrowLeft } from "react-icons/ai";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';


const CreateNote = ({onSave , user}) => {

  const [newNote, setNewNote] = useState({
    title: '',
    body: '',
    user : user,
  });

  function getNote(e) {
    setNewNote((prevNote) => ({
      ...prevNote,
      body: e.target.value,
    }));
  }

  function getTitle(e) {
    setNewNote((prevNote) => ({
      ...prevNote,
      title: e.target.value,
    }));
  }

  async function save() {
    if(newNote.body === '' ){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `you can't save a note without a body. please fill the note`,
      })
      return
    }
    try {
      await axios.post('https://mern-notes-app-65gy.onrender.com/note', {
        title: newNote.title,
        body: newNote.body,
        user: newNote.user,
      })
      .then((res) => {
        onSave();
      })
    } catch (error) {
      console.error('Error saving note:', error);
    }
  }

  return (
    <div className='Createnote-container'>
      <div className="title-container head">
        <div className="backHomeBtn">
          <Link to="/"><AiOutlineArrowLeft/><p>Back</p></Link>
        </div>
        <div className="title-input">
          <input 
            type="text" 
            placeholder='title...' 
            onChange={getTitle}
            value={newNote.title}  
          />
        </div>
        <div className="btns">
          <button onClick={save} >save</button>
        </div>
      </div>
      <div className="note-container">
        <textarea 
          placeholder='write something here' 
          onChange={getNote}
          value={newNote.body}
        ></textarea>
      </div>
    </div>
  )
}

export default CreateNote