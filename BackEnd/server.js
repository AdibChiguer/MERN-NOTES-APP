// import 
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const connectToDb = require('./config/connectToDb')
const NoteController = require('./controllers/Note-controller');
const UserController = require('./controllers/User-controller');
const cookieParser = require('cookie-parser')
const requireAuth = require('./middleware/auth')


const app = express();
const port = process.env.PORT

// CONNECT TO DATABASE
connectToDb();


//config express
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:true,
  credentials:true,
}))


// SIGNUP
app.post('/signup' , UserController.signup)
// LOGIN
app.post('/login' , UserController.login)
// LOGOUT
app.get('/logout' , UserController.logout)
// CHECK AUTH
app.post('/check-auth' , requireAuth , UserController.checkAuth)
// GET ALL NOTES
app.get('/notes' , NoteController.fetchNotes)
// GET NOTE BY ID
app.get('/note' , NoteController.fetchNote)
// CREATE NOTE 
app.post('/note' , NoteController.createNote)
// UPDATE NOTE BY ID
app.put('/note' , NoteController.UpdateNote)
// DELETE NOTE BY ID
app.delete('/note' , NoteController.deleteNote)

app.listen(5000 , () => {
  console.log(`server listening on ${5000}`);
})