import React, { useState, useEffect, useRef } from 'react'
import {
  ChatbotContainer,
  ChatbotWrapper,
  ChatbotMessage,
  ChatbotInput,
  ChatbotButton,
  ChatbotTitle,
  ChatbotToggleButton,
} from './ChatBotElements'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I help you today?', fromUser: false },
  ])
  const [userInput, setUserInput] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const messagesEndRef = useRef(null)
  const typingInterval = 25

  const handleUserInput = (e) => {
    setUserInput(e.target.value)
  }

  const handleSendMessage = () => {
    if (userInput.trim() === '') return

    setMessages([...messages, { text: userInput, fromUser: true }])

    let botReply = ''

    if (userInput.toLowerCase().includes('delivery')) {
      botReply = 'You can check our delivery options on the delivery page.'
    } else if (userInput.toLowerCase().includes('account')) {
      botReply = 'To manage your account, please visit your account settings.'
    } else if (userInput.toLowerCase().includes('services')) {
      botReply = 'We offer an international delivery service, login to access real-time tracking and secure payment options.'
    } else if (userInput.toLowerCase().includes('help')) {
      botReply = 'I can assist you with "services", "delivery", or "account". What do you need help with?'
    } else {
      botReply = 'I’m not sure how to help with that. Could you rephrase? Try entering "help"'
    }

    simulateBotResponse(botReply)
    setUserInput('')
  }

  const simulateBotResponse = (response) => {
    let typedMessage = ''
    const typeInterval = setInterval(() => {
      if (typedMessage.length < response.length) {
        typedMessage += response[typedMessage.length]
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { text: typedMessage, fromUser: false },
        ])
      } else {
        clearInterval(typeInterval)
      }
    }, typingInterval)

    //add empty bot message to start typing
    setMessages((prevMessages) => [...prevMessages, { text: '', fromUser: false }])
  }

  //scroll to bottom of chat whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <ChatbotToggleButton onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Close Chat' : 'Chat'}
      </ChatbotToggleButton>
      {isVisible && (
        <ChatbotContainer id="chatbot">
          <ChatbotTitle>Chat with Us</ChatbotTitle>
          <ChatbotWrapper>
            {messages.map((message, index) => (
              <ChatbotMessage key={index} user={message.fromUser}>
                {message.text}
              </ChatbotMessage>
            ))}
            <div ref={messagesEndRef} /> {/* invisible marker for scrolling */}
          </ChatbotWrapper>
          <div>
            <ChatbotInput
              type="text"
              value={userInput}
              onChange={handleUserInput}
              placeholder="Ask me anything..."
            />
            <ChatbotButton onClick={handleSendMessage}>Send</ChatbotButton>
          </div>
        </ChatbotContainer>
      )}
    </>
  )
}

export default Chatbot
