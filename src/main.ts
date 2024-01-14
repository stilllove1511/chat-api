import { Server } from 'socket.io'
import * as dotenv from 'dotenv'
import { ServerType } from '@src/util/type'
dotenv.config()
import { configSocketPath } from '@src/routes/socket'
import { Request, Response, NextFunction } from 'express'
require('express-async-errors')

// run socket
const socketPort = +process.env.SOCKET_PORT || 3002

const io: ServerType = new Server()

configSocketPath(io)

io.listen(socketPort)

// run express
import express = require('express')
import { configRestPath } from '@src/routes/rest'
import cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
configRestPath(app)

// Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack) // Log error stack to console

    res.status(500).json({
        message: 'Internal server error',
    })
})

const port = +process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Rest service listening on port ${port}`)
})
