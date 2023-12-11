import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../App.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ServerMessage } from '../Redux-apps/RdxContext';



const Room = () => {
  const name = useSelector(state => state.nameOfRoom.value)

  const dispatch = useDispatch()
  const message = useSelector(state => state.messageFromServer.message)

  const [text, setText] = useState('')
  const [fromBack, setFromBack] = useState('')

  const formOnSubmit = (elem) => {
    elem.preventDefault()
    elem.target.reset()
    dispatch(ServerMessage(text))
  }

  // console.log('Room: ' + name)

  useEffect(() => {
    if (name.length > 0) {
      const socket = new WebSocket(`ws://127.0.0.1:8000/ws/room/${name}/`)
      socket.onopen = () => {
        console.log('Подключение установлено')
        console.log('В useEffect: ' + message)

        socket.send(JSON.stringify({
          'message': message
        }))
      }
      socket.onclose = () => console.log('Подключение разорвано')


      socket.onmessage = (msg) => {
        let data = JSON.parse(msg.data)
        console.log(data.message)
        setFromBack(data.message)
      }

      return () => socket.close();
    }
  }, [message])

  console.log('За пределами useEffect: ' + message)

  return (
    <Container>
      <Row>
        <div className='mt-5'>
          <div className='chat-window'>
            <div class="message-blue">
              <p class="message-content">{fromBack}</p>
            </div>
          </div>
          <div>
            <form onSubmit={formOnSubmit}>
              <input
                onChange={(e) => setText(e.target.value)}
                className='chat-input mt-5'
                type="text"
              />

              <Button type='submit' variant="outline-secondary" id="button-addon2">Button</Button>
            </form>
          </div>
        </div>
      </Row>
    </Container>
  )
}

export default Room