import './App.css';
import SideBar from './components/sideBar/SideBar';
import Home from './components/home/Home';
import { Routes, Route, useLocation , Navigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CreateNote from './components/Createnote/CreateNote';
import SeeNote from './components/seeNote/SeeNote';
import axios from 'axios'
import SignUp from './components/signup/SignUp';
import Login from './components/login/Login';
import Loading from './components/loading page/Loading';


function App() {
  const [notes , setNotes] = useState([]);
  const [isnotesChange , setIseNotesChange] = useState(false);
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [user , setUser] = useState({
    email : '',
    username : '',
    _id : '',
  });
  const [isloading , setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [toggle , setToggle] = useState(false);

  useEffect(()=> {
    checkAuth()
    if(user._id !== ''){
      getAllNotes(user)
    }


    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check


  } ,[isnotesChange , user._id])


  async function checkAuth() {
    try {
      const response = await axios.post('https://mern-notes-app-65gy.onrender.com/check-auth', {
        token: localStorage.getItem('token'),
      });
      setIsLoggedIn(response.data.islogedIn);
      setUser({
        email : response.data.user.email,
        username : response.data.user.username,
        _id : response.data.user._id,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }

  function getAllNotes(user) {    
    axios.get(`https://mern-notes-app-65gy.onrender.com/notes?_id=${user._id}`)    
    .then((res) => {
      const allNotes = res.data.notes; 
      setNotes(allNotes); 
    })
    .catch((error) => {
      console.error('Error fetching notes:', error);
    });
  }

  // Use the useLocation hook to get the current path
  const location = useLocation();
  const hideSidebarOnPaths = ['/signup' , '/login'];

  // Check if the current path is in the array of paths where sidebar should be hidden
  const shouldHideSidebar = hideSidebarOnPaths.includes(location.pathname);

  return (
    <div className="App">
      <div className="Content-container">
        {!shouldHideSidebar && (!isloading && <SideBar notes={notes} user={user} Width={windowWidth} ontoggele={() => setToggle(!toggle)} toggle={toggle} />)}
        <Routes>
          { isloading ? 
            <Route path="/" element={<Loading />} /> : 
            <Route path="/" element={
              isLoggedIn ? 
                <Home Width={windowWidth} ontoggele={() => setToggle(!toggle)} />
                : <Navigate to="/login"  />
              }
            />
          }
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/n/:id"
            element={
              isLoggedIn ? (
                <SeeNote onSave={() => setIseNotesChange(!isnotesChange)} user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/Createnote"
            element={
              isLoggedIn ? (
                <CreateNote onSave={() => setIseNotesChange(!isnotesChange)} user={user}/>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
