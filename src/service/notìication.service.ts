import { initializeApp } from 'firebase-admin/app'
import { getMessaging } from 'firebase-admin/messaging'
import serviceAccount from '../cert/chat-f89cb-firebase-adminsdk-fjetm-c6be34f6a3.json'
import * as admin from 'firebase-admin'

export class NotificationService {
    constructor() {
        initializeApp({
            credential: admin.credential.cert(
                serviceAccount as admin.ServiceAccount
            ),
            projectId: process.env.FIREBASE_PROJECT_ID,
        })
    }

    async sendNotification({
        title,
        body,
        token,
    }: {
        title: string
        body: string
        token: string
    }) {
        const message = {
            notification: {
                title,
                body,
            },
            token,
        }

        getMessaging()
            .send(message)
            .then((response) => {
                console.log('>>> Successfully sent message:', response)
            })
            .catch((error) => {
                console.log('>>> Error sending message:', error)
            })
    }
}
