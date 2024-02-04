import { MessageService } from '../service/message.service'
import { SOCKET_EVENT } from '../util/enum'
import { SocketType } from '../util/type'

export class ChatController {
    constructor(private readonly messageService: MessageService) {}

    chat(socket: SocketType) {
        try {
            const userId = socket.handshake.headers.authorization as string
            const dialogId = socket.handshake.query.dialogId as string

            socket.join(dialogId)

            socket.on(
                SOCKET_EVENT.CLIENT_SEND_MESSAGE_EVENT,
                async (message) => {
                    socket
                        .to(dialogId)
                        .emit(SOCKET_EVENT.SERVER_SEND_MESSAGE_EVENT, message)
                    try {
                        await this.messageService.saveMessages({
                            text: message,
                            userId,
                            dialogId: dialogId,
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
            )
        } catch (error) {
            socket.disconnect()
            console.log(error)
        }
    }
}
