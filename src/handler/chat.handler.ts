import { DialogService } from '@src/service/dialog.service'
import { MessageService } from '@src/service/message.service'
import { SocketType } from '@src/util/type'

const messageService = new MessageService()
const dialogService = new DialogService()

export class ChatHandler {
    chat(socket: SocketType) {
        try {
            const userId = socket.handshake.headers.user as string
            const dialogId = socket.handshake.query.dialogId as string

            socket.join(dialogId)

            socket.on('incomeMessageEvent', (message) => {
                socket.to(dialogId).emit('receiveMessageEvent', message)
                try {
                    messageService.saveMessages({
                        text: message,
                        userId,
                        dialogId: dialogId,
                    })
                } catch (error) {
                    console.log(error)
                }
            })
        } catch (error) {
            socket.disconnect()
            console.log(error)
        }
    }
}
