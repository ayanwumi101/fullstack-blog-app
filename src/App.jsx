import { useState } from 'react'
import './App.css'
import Home from './components/Homepage/Home'
import Signup, { Login } from './components/Signup/Signup'
import Navbar from './components/Navbar/Navbar'
import CreatePost from './components/CreatePost/CreatePost'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Teams from './components/Teams/Teams'
import Sports from './components/Sports/Sports'
import Education from './components/Education/Education'
import Tech from './components/Tech/Tech'
import Politics from './components/Politics/Politics'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Router>
         <Navbar />
          <Routes>
            <Route exact path='/' element={<Navigate replace to='/login' />} />
            <Route exact path='/create_post' element={<CreatePost />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/contact' element={<Contact />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/teams' element={<Teams />} />
            <Route exact path='/sports' element={<Sports />} />
            <Route exact path='/tech' element={<Tech />} />
            <Route exact path='/politics' element={<Politics />} />
            <Route exact path='/education' element={<Education />} />
            <Route exact path='/home' element={<Home />}/>
          </Routes>
      </Router>
     
    </div>
  )
}

export default App
