const Note = require('../models/note')

const fetchNotes = async (req , res) => {
  try {
    const userId = req.query._id;
    const notes = await Note.find({ user: userId });
    res.json({ notes });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const fetchNote = async (req , res) => {
  try {
    // GET THE NOTE ID FORM THE URL
    const noteId = req.query.n;
    const userId = req.query._id;
    // GET THE NOTE FROM THE DATABASE BY ID
    const note = await Note.findOne({ _id : noteId , user : userId});
    if(!note) {
      return res.sendStatus(404).json({message: 'not found'})
    }
    // RES WITH THE NOTE
    res.json({note})
  } catch (err) {
    res.status(400).json({message : err.message})
  }
}

const createNote = async (req , res) => {
  try {
    // get ther body and the title from the req
    const {title , body } = req.body ;
    // create a new note 
    const newNote = await Note.create({
      title, 
      body,
      user: req.body.user._id
    })
    if(!newNote) {
      return res.sendStatus(400).json({message : 'note not created'})
    }
    // res with the new note
    res.json({newNote})
  } catch (err) {
    res.status(400).json({message : err.message})
  }
}

const UpdateNote = async (req , res) => {
  try {
    // GET THE NOTE ID FORM THE URL AND THE UPDATED INFO
    const noteId = req.query.n;
    const userId = req.query._id;
    const {title , body} = req.body
    // CREATE THE UPDATED NOTE
    await Note.findOneAndUpdate({ _id : noteId , user : userId } , {
      title,
      body,
    })
    const NewUpdatedNote = await Note.findById(noteId)
    // RES WITH THE UPDATED NOTE
    res.json({NewUpdatedNote})
  } catch (err) {
    res.status(400).json({message : err.message})
  }
}

const deleteNote = async (req , res) => {
  try {
    // GET THE NOTE ID FORM THE URL
    const noteId = req.query.n;
    const userId = req.query._id;
    // DELETE THE NOTE
    const dbres = await Note.deleteOne({ _id : noteId , user: userId })
    // RES 
    res.json({ message : 'note deleted' , id : noteId})
  } catch (err) { 
    res.status(400).json({message : err.message})
  }
}

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  UpdateNote,
  deleteNote
} 