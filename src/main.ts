import { Server } from 'socket.io'
import * as dotenv from 'dotenv'
import { ServerType } from '@src/util/type'
import { ChatHandler } from '@src/handler/chat.handler'
dotenv.config()

// run socket
const socketPort = +process.env.SOCKET_PORT || 3002

const io: ServerType = new Server()

io.of('/chat').on('connection', (socket) => {
    const chatHandler = new ChatHandler()
    chatHandler.chat(socket)
})

io.listen(socketPort)

// run express
import express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const port = +process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
