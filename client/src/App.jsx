import { Routes, Route } from 'react-router-dom'
import Login from "./pages/Login"
import Chat from "./pages/Chat.jsx"
import './App.css'

function App() {

  return (

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
  )
}

export default App
