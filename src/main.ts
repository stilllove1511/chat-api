import { Server } from 'socket.io'
import * as dotenv from 'dotenv'
import { ServerType } from '@src/util/type'
dotenv.config()
import { configSocketPath } from '@src/routes/socket'
import { Request, Response, NextFunction } from 'express'
require('express-async-errors')

import express = require('express')
import { configRestPath } from '@src/routes'
import cors = require('cors')
const app = express()
const server = require('http').createServer()
const io: ServerType = new Server(server, {
    path: '/',
    cors: {
        origin: 'http://localhost:3000',
    },
})
configSocketPath(io)

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

server.listen(3002)
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
