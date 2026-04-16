import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { io } from 'socket.io-client'
import { MESSAGE_API_ENDPOINT } from '../utils/constant'
import { setSelectedUser, setMessages, addMessage, setOnlineUsers } from '../redux/chatSlice'
import Navbar from './Navbar'

const SOCKET_URL = 'http://localhost:8000'

const Messages = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.auth)
    const { selectedUser, messages, onlineUsers } = useSelector(store => store.chat)

    const [conversations, setConversations] = useState([])
    const [input, setInput] = useState('')
    const [socket, setSocket] = useState(null)
    const [showSidebar, setShowSidebar] = useState(true)
    const messagesEndRef = useRef(null)

    // Connect socket on mount
    useEffect(() => {
        if (!user) return
        const s = io(SOCKET_URL, { withCredentials: true })
        setSocket(s)
        s.emit('addUser', user._id)

        s.on('getOnlineUsers', (users) => {
            dispatch(setOnlineUsers(users))
        })

        return () => s.disconnect()
    }, [user])
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Listen for incoming messages
    useEffect(() => {
        if (!socket) return
        const handler = (msg) => {
            // FIX BUG 2: Only add message from socket if it was sent BY the other person.
            // When current user sends, we already added it via API response dispatch.
            // So here we only add messages where senderId is NOT the current user.
            if (msg.senderId !== user._id) {
                if (selectedUser && msg.senderId === selectedUser._id) {
                    dispatch(addMessage(msg))
                }
            }
            // Refresh conversations sidebar to update last message
            fetchConversations()
        }
        socket.on('receiveMessage', handler)
        return () => socket.off('receiveMessage', handler)
    }, [socket, selectedUser, user])

    // Fetch conversations
    const fetchConversations = async () => {
        try {
            const res = await axios.get(`${MESSAGE_API_ENDPOINT}/conversations`, { withCredentials: true })
            if (res.data.success) {
                setConversations(res.data.conversations)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user) fetchConversations()
    }, [user])

    // Fetch messages when a user is selected
    useEffect(() => {
        if (!selectedUser) return
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`${MESSAGE_API_ENDPOINT}/${selectedUser._id}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setMessages(res.data.messages))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchMessages()
    }, [selectedUser])

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Send message
    const handleSend = async () => {
        if (!input.trim() || !selectedUser) return
        try {
            const res = await axios.post(
                `${MESSAGE_API_ENDPOINT}/send/${selectedUser._id}`,
                { text: input },
                { withCredentials: true }
            )
            if (res.data.success) {
                const newMsg = res.data.message

                // Add message to UI immediately via API response (only once here)
                dispatch(addMessage(newMsg))

                // Emit via socket so the RECEIVER gets it in real-time
                // We do NOT add it again on our own socket event (handled in handler above)
                socket?.emit('sendMessage', {
                    _id: newMsg._id,
                    senderId: user._id,
                    receiverId: selectedUser._id,
                    text: newMsg.text,
                    createdAt: newMsg.createdAt
                })

                setInput('')
                fetchConversations()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    // FIX BUG 1: Get the other participant from a conversation
    // participants is an array of 2 users. We want the one who is NOT the logged-in user.
    // Previously this was correct but only works if participants are populated objects.
    // Added a fallback: compare both _id (string) and id (some backends return 'id' not '_id')
    const getOtherUser = (conversation) => {
        return conversation.participants.find(
            p => p._id?.toString() !== user._id?.toString()
        )
    }

    // Select a conversation
    const handleSelectConversation = (conversation) => {
        const otherUser = getOtherUser(conversation)
        if (!otherUser) return  // safety check — never select undefined
        dispatch(setSelectedUser(otherUser))
        setShowSidebar(false)
    }

    const formatTime = (dateStr) => {
        if (!dateStr) return ''
        const date = new Date(dateStr)
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">

                {/* LEFT SIDEBAR - Conversations */}
                <div className={`${showSidebar ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-80 border-r border-gray-200 bg-white`}>
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-bold text-gray-800">Messages</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {conversations.length > 0 ? conversations.map((conv) => {
                            const otherUser = getOtherUser(conv)
                            if (!otherUser) return null
                            const lastMsg = conv.messages?.[0]
                            const isOnline = onlineUsers.includes(otherUser._id)
                            const isSelected = selectedUser?._id === otherUser._id

                            return (
                                <div
                                    key={conv._id}
                                    onClick={() => handleSelectConversation(conv)}
                                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 ${isSelected ? 'bg-blue-50' : ''}`}
                                >
                                    <div className="relative">
                                        <img
                                            src={otherUser.profile?.profilePhoto || ''}
                                            alt={otherUser.fullname}
                                            className="w-11 h-11 rounded-full bg-gray-300 object-cover"
                                        />
                                        {isOnline && (
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-800 truncate">{otherUser.fullname}</p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {lastMsg?.text || 'Start a conversation'}
                                        </p>
                                    </div>
                                    {lastMsg && (
                                        <span className="text-[10px] text-gray-400 whitespace-nowrap">{formatTime(lastMsg.createdAt)}</span>
                                    )}
                                </div>
                            )
                        }) : (
                            <div className="p-6 text-center text-gray-400 text-sm">
                                No conversations yet.
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT PANEL - Chat */}
                <div className={`${!showSidebar || selectedUser ? 'flex' : 'hidden'} md:flex flex-col flex-1 bg-gray-50`}>
                    {selectedUser ? (
                        <>
                            {/* Chat Header */}
                            <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
                                <button
                                    onClick={() => { setShowSidebar(true); dispatch(setSelectedUser(null)) }}
                                    className="md:hidden text-gray-600 mr-1"
                                >
                                    <i className="fa-solid fa-arrow-left text-lg"></i>
                                </button>
                                <div className="relative">
                                    <img
                                        src={selectedUser.profile?.profilePhoto || ''}
                                        alt={selectedUser.fullname}
                                        className="w-10 h-10 rounded-full bg-gray-300 object-cover"
                                    />
                                    {onlineUsers.includes(selectedUser._id) && (
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                    )}
                                </div>
                                <div>
                                    {/* FIX BUG 1: selectedUser is always the OTHER person now,
                                        so this will correctly show recruiter name to jobseeker
                                        and jobseeker name to recruiter */}
                                    <p className="text-sm font-semibold text-gray-800">{selectedUser.fullname}</p>
                                    <p className="text-xs text-gray-500">
                                        {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
                                    </p>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                                {messages.map((msg, i) => {
                                    const isMine = msg.senderId === user._id
                                    return (
                                        <div key={msg._id || i} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[75%] sm:max-w-[60%] px-3 py-2 rounded-xl text-sm ${isMine ? 'bg-blue-500 text-white rounded-br-sm' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'}`}>
                                                <p className="wrap-break-word">{msg.text}</p>
                                                <p className={`text-[10px] mt-1 text-right ${isMine ? 'text-blue-100' : 'text-gray-400'}`}>
                                                    {formatTime(msg.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-3 bg-white border-t border-gray-200">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type a message..."
                                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-400"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim()}
                                        className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                    >
                                        <i className="fa-solid fa-paper-plane text-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="hidden md:flex flex-1 items-center justify-center">
                            <div className="text-center text-gray-400">
                                <i className="fa-regular fa-comments text-6xl mb-4"></i>
                                <p className="text-lg font-medium">Select a conversation to start messaging</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Messages