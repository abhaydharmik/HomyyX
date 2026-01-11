import { useEffect } from 'react'
import { useChat } from '../context/ChatContext'
import { socket } from '../services/socket'

const useSocket = () => {

    const {addMessage}= useChat()
  
    useEffect(() => {
        //connect socket
        socket.connect()

        socket.on("receive_message", (message)=> {
            addMessage({...message, self: false})
        })

      return () => {
        socket.off("receive_message")
        socket.disconnect()
      }
    }, [])
    
  
}

export default useSocket