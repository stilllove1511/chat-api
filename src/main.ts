import { Server } from 'socket.io'
import * as dotenv from 'dotenv'
import { ServerType } from '@src/util/type'
dotenv.config()
import { configSocketPath } from '@src/routes/socket'

// run socket
const socketPort = +process.env.SOCKET_PORT || 3002

const io: ServerType = new Server()

configSocketPath(io)

io.listen(socketPort)

// run express
import express = require('express')
import { configRestPath } from '@src/routes/rest'
const app = express()

app.use(express.json())
configRestPath(app)

const port = +process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Rest service listening on port ${port}`)
})
