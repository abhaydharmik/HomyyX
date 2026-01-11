import { useEffect, useRef } from 'react'
import { useChat } from '../context/ChatContext'
import { socket } from '../services/socket'

const useSocket = () => {

    const {addMessage, username}= useChat()
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

      return () => {
        socket.off("receive_message")
        socket.disconnect()
        connectedRef.current = false
      }
    }, [username])
    
  
}

export default useSocket