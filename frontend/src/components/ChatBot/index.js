import React, { useState } from 'react'
import { ChatbotContainer, ChatbotWrapper, ChatbotMessage, ChatbotInput, ChatbotButton, ChatbotTitle } from './ChatBotElements'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I help you today?', fromUser: false },
  ])

  const [userInput, setUserInput] = useState('')

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
      botReply = 'I can assist you with services, delivery, or account. What do you need help with?'
    } else {
      botReply = 'I’m not sure how to help with that. Could you rephrase? (Help)'
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: botReply, fromUser: false },
    ])
    setUserInput('')
  }

  return (
    <ChatbotContainer id="chatbot">
      <ChatbotTitle>Chat with Us (WIP)</ChatbotTitle>
      <ChatbotWrapper>
        {messages.map((message, index) => (
          <ChatbotMessage key={index} user={message.fromUser}>
            {message.text}
          </ChatbotMessage>
        ))}
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
  )
}

export default Chatbot
