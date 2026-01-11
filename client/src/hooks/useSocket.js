import { useEffect, useRef } from 'react'
import { useChat } from '../context/ChatContext'
import { socket } from '../services/socket'

const useSocket = () => {

    const {addMessage, username, setTypingUser}= useChat()
    const connectedRef = useRef(false)
  
    useEffect(() => {
        if(!username || connectedRef.current) return

        connectedRef.current = true

        //connect socket
        socket.connect()

        // Notify server user joined
        socket.emit("join_chat", username)

        socket.on("receive_message", (message)=> {
            addMessage({...message, self: false})
        })

        socket.on("user_typing", ({username})=> {
          setTypingUser(username)
        })

        socket.on("user_stop_typing", ()=> {
          setTypingUser("")
        })

        
      return () => {
        socket.off("receive_message")
        socket.disconnect()
        connectedRef.current = false
      }
    }, [username])
    
  
}

export default useSocket