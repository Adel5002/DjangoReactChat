import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import '../App.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Col } from 'reactstrap';



const Room = () => {
  const name = useSelector(state => state.nameOfRoom.value)

  const [text, setText] = useState('')
  const [sendMessage, setSendMessage] = useState('')
  const [receiveMessage, setReceiveMessage] = useState([])
  const [roomMessages, setRoomMessages] = useState([])

  const socketRef = useRef(null)

  const formOnSubmit = (elem) => {
    elem.preventDefault()
    elem.target.reset()
    setSendMessage(text)
  }



  // connecting to the room
  useEffect(() => {
    if (name.length > 0) {

      socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/room/${name}/`)
      socketRef.current.onopen = () => console.log('Подключение установлено')
      socketRef.current.onclose = () => console.log('Подключение разорвано')
      socketRef.current.onmessage = (msg) => {
        let data = JSON.parse(msg.data)
        if (data.messages) {
          setRoomMessages(data.messages)

        }
        if (data.message) {
          setReceiveMessage((prevMessages) => [...prevMessages, data.message])
        }
      }
    }

    return () => socketRef.current.close()
  }, [name])

  console.log(roomMessages)

  // sending messages to back
  useEffect(() => {

    if (socketRef.current && socketRef.current.readyState === 1 && sendMessage) {
      socketRef.current.send(
        JSON.stringify({
          'message': sendMessage
        })
      )
    }
  }, [sendMessage])

  return (
    <Container>
      <Row>
        <Col>
          <div className='mt-5'>
            <div className='chat-window' id="style-7">
              {roomMessages.map(msg =>
                <div key={msg.id} className="message-blue">
                  <small>{msg.date_creation}</small>
                  <p className="message-content">{msg.message}</p>
                </div>
              )}

              {receiveMessage.map(msg =>
                <div key={msg.id} className="message-blue">
                  <small>{msg.date_creation}</small>
                  <p className="message-content">{msg.message}</p>
                </div>
              )}
            </div>
            <form className='message-input' onSubmit={formOnSubmit}>
              <div className='input-group'>
                <input
                  onChange={(e) => setText(e.target.value)}
                  className='chat-input mt-5 form-control'
                  type="text"
                />
                 <Button className='mt-5' type='submit' variant="outline-secondary" id="button-addon2">Button</Button>
              </div>
             
            </form>
            <div>
            </div>
          </div>
        </Col>
      </Row>
    </Container >
  )
}

export default Room