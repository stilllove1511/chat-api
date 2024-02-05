// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'firebase-admin/app'
// eslint-disable-next-line import/no-unresolved
import { getMessaging } from 'firebase-admin/messaging'
import serviceAccount from '../cert/firebase-adminsdk-cert.json'
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

    sendNotification({
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

        return getMessaging()
            .send(message)
    }
}
