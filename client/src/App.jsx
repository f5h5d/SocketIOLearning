import { useEffect, useState } from 'react'
import styled from "styled-components"

import io from "socket.io-client"

const socket = io.connect("http://localhost:3001")

const App = () => {
  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState("")
  const [room, setRoom] = useState("")
  const sendMessage = () => {
    socket.emit("send_message", {message: message, room: room})
  }

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room)
    }
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <Container>
      <div className="app">
        <div className="room">
          <input onChange={(event) => { setRoom(event.target.value)}}/>
          <button onClick={joinRoom}>Join Room</button>
        </div>
        <input placeholder="Message..." onChange={(event) => { setMessage(event.target.value)}}/>
        <button onClick={sendMessage}>Send Message</button>
        <h1>Message: {messageReceived}</h1>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  color: black;

  /* align-items: center; */

  display: flex;
  justify-content: center; 

  .app {
    margin-top: 100px;
  }
`

export default App
