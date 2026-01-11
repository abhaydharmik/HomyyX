import React, { createContext, useContext, useState, useEffect } from 'react'

const ChatContext = createContext()


const USERNAME_KEY = "hommyx_username"

export const ChatProvider = ({children}) => {

    const [messages, setMessages] = useState([])
    const [username, setUsername] = useState("yourname")
    const [typingUser, setTypingUser] = useState("")

    useEffect(() => {

        const storedUser = localStorage.getItem(USERNAME_KEY)

        if(storedUser){
            setUsername(storedUser)
        } 
    }, [])
    
    
    const addMessage = (message)=> {
        setMessages((prev)=> [...prev, message])
    }

    const saveUsername = (name) => {
        setUsername(name)
        localStorage.setItem(USERNAME_KEY, name)
    }
    
    const clearUsername = (name) => {
        setUsername(name)
        localStorage.removeItem(USERNAME_KEY, name)
    }
    
    

    return(
        <ChatContext.Provider value={{messages, addMessage, username, saveUsername, clearUsername, typingUser, setTypingUser}}>
            {children}
        </ChatContext.Provider>
    )
}


export const useChat = () => useContext(ChatContext)