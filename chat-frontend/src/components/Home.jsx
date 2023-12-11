import React, { useState } from 'react'
import '../App.css'
import { Container, Row } from 'reactstrap'
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { RoomName } from '../Redux-apps/RdxContext';
import { useNavigate } from "react-router-dom";





const Home = (props) => {
    const [room, setRoom] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const formOnSubmit = (elem) => {
        elem.preventDefault();
        dispatch(RoomName(room))
        navigate(`/ws/room/${room}`)
    }

    const inputOnChange = (elem) => {
        setRoom(elem.target.value)
    }


    return (

        <Container>
            <Row>
                <div className='test'>
                    <form onSubmit={formOnSubmit}>
                        <input
                            className='room-input'
                            type="text"
                            placeholder='Type something...'
                            onChange={inputOnChange}
                            value={room}
                        />
                        <Button type='submit' variant="dark">Click me</Button>
                    </form>
                </div>
            </Row>
        </Container>
    )
}

export default Home