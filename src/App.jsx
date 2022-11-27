import { useState } from 'react'
import './App.css'
import Home from './components/Homepage/Home'
import Signup, { Login } from './components/Signup/Signup'
import Navbar from './components/Navbar/Navbar'
import CreatePost from './components/CreatePost/CreatePost'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import PostDetails from './components/PostDetails/PostDetails'

function App() {

  return (
    <div className="App">
      <Router>
         <Navbar />
          <Routes>
            <Route exact path='/' element={<Navigate replace to='/login' />} />
            <Route exact path='/create_post' element={<CreatePost />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/home' element={<Home />}/>
            <Route exact path='/posts/:id' element={<PostDetails />} />
          </Routes>
      </Router>
    </div>
  )
}

export default App
