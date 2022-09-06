import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Home from './components/Homepage/Home'
import Signup, { Login } from './components/Signup/Signup'
import Navbar from './components/Navbar/Navbar'
import CreatePost from './components/CreatePost/CreatePost'
import Posts from './components/Posts/Posts'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar />
      <Posts />
      {/* <CreatePost /> */}
      {/* <Home /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </div>
  )
}

export default App
