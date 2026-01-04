import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const handleEnter = () => {
        navigate("/chat")
    }

  return (
    <div className='login-page'>
        <h1>HomyyX</h1>
        <p>Chat Together. Stay Close.</p>

        <button onClick={handleEnter}>Enter Chat</button>
    </div>
  )
}

export default Login