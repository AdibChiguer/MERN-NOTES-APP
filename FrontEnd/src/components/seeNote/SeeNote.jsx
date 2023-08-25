import React, { useEffect , useState} from 'react'
import axios from 'axios';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import './seenote.css'
import Swal from 'sweetalert2'


const SeeNote = ({onSave , user}) => {

  const { id } = useParams();
  const [note, setNote] = useState({
    title: '',
    body: '',
    _id: ''
  });
  const [isChange , setIsChange] = useState(false)

  useEffect(() => {
    getNote(id)
  } , [id])

  function getNote(id) {
    axios.get(`http://localhost:5000/note?n=${id}&_id=${user._id}`)
    .then((res) => {
      const resNote = res.data.note;
      setNote({
        title: resNote.title,
        body: resNote.body,
        _id: resNote._id
      })
    })
    .catch((err) => {
      // console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'something went wrong. try again',
      })
    })
  }

  function GetTitle(e){
    setIsChange(true)
    setNote((prevNote) => ({
      ...prevNote,
      title: e.target.value,
    }));
  }

  function GetNote(e){
    setIsChange(true)
    setNote((prevNote) => ({
      ...prevNote,
      body: e.target.value,
    }));
  }

  function UpdateNote(n){
    axios.put(`http://localhost:5000/note?n=${n._id}&_id=${user._id}`, {
      title: n.title,
      body: n.body,
    })
    .then((res) => {
      onSave(note);
      Swal.fire(
        'updated successfully',
        'success'
      )
    })
    .catch((err) => {
      // console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'something went wrong. try again',
      })
    })
  }

  async function DeleteNote(n){
    await axios.delete(`http://localhost:5000/note?n=${n._id}&_id=${user._id}`)
    .then((res) => {
      onSave(note);
      Swal.fire(
        'deleted successfully',
        'success'
      ).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          window.location.href = '/'
        }
      })
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'something went wrong. try again',
      })
    })
  }

  function ConfirmDelete(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteNote(note)
      }
    })
  }
  return (
    <div className='Seenote-container'>
      <div className="title-container head">
        <div className="backHomeBtn">
          <Link to="/"><AiOutlineArrowLeft/><p>Back</p></Link>
        </div>
        <div className="title-input">
          <input 
            type="text" 
            placeholder='title...' 
            onChange={GetTitle}
            value={note?.title}  
          />
        </div>
        <div className="btn">
          <button onClick={() => {ConfirmDelete()}}>delete</button>
          {
            isChange === true ?
            <button onClick={() => {UpdateNote(note)}}>save</button> :
            null
          }
        </div>
      </div>
      <div className="note-container">
        <textarea 
          placeholder='write something here' 
          onChange={GetNote}
          value={note?.body}
        ></textarea>
      </div>
    </div>
  )
}

export default SeeNote