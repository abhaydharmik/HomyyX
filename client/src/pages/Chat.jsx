import React from 'react'
import Sidebar from "../components/Sidebar/UserList"
import ChatWindow from "../components/Chat/ChatWindow"
import Header from '../components/Common/Header'
import useSocket from '../hooks/useSocket'

const Chat = () => {

  // Socket Activated 
  useSocket()

  return (
    <div className='h-screen flex bg-gray-100 dark:bg-gray-900'>
        {/* Sidebar */}
       <div className="w-64 hidden md:block">
        <Sidebar />
       </div>

       {/* Chat Area */}

       <div className="flex-1 flex flex-col">
        <Header />
        <ChatWindow />
       </div>
    </div>
  )
}

export default Chat