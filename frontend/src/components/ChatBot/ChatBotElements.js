import styled from 'styled-components'

export const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 70px;
  right: 20px;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`

export const ChatbotWrapper = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 15px;
`

export const ChatbotMessage = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: ${(props) => (props.user ? '#ffb23e' : '#f1f1f1')};
  border-radius: 10px;
  text-align: ${(props) => (props.user ? 'right' : 'left')};
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
    border-color: #ffb23e;
  }
`

export const ChatbotButton = styled.button`
  padding: 10px 20px;
  background-color: #f09100;
  color: black;
  border: none;
  border-radius: 20px;
  margin-top: 5px;
  cursor: pointer;

  &:hover {
    background-color: #bd7200;
  }
`

export const ChatbotTitle = styled.h2`
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`

export const ChatbotToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #f09100;
  color: black;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: #bd7200;
  }
`
