// ChatbotElements.js
import styled from 'styled-components'

export const ChatbotContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`

export const ChatbotWrapper = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 15px;
`

export const ChatbotMessage = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: ${props => (props.user ? '#e1f5fe' : '#f1f1f1')};
  border-radius: 10px;
  text-align: ${props => (props.user ? 'right' : 'left')};
  max-width: 80%;
  word-wrap: break-word;
`

export const ChatbotInput = styled.input`
  width: 80%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`

export const ChatbotButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`

export const ChatbotTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
`
